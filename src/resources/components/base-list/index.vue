<template>
    <van-pull-refresh
        v-model="refreshLoading"
        success-text="刷新成功"
        class="fill-available"
        :disabled="!pull || !req"
        @refresh="listMore('refresh')"
    >
        <template v-if="isEmpty">
            <!-- 空数据插槽 -->
            <slot v-if="$slots.empty" name="empty"></slot>
            <div v-else class="empty-wrapper">
                <base-empty :type="emptyType" :image="emptyImage" :desc="emptyDesc"></base-empty>
            </div>
        </template>
        <template v-else>
            <van-list
                v-model:error="error"
                v-model:loading="loading"
                :immediate-check="false"
                :finished="finished"
                :finished-text="finishedText"
                error-text="请求失败，点击重新加载"
                @load="listMore('more')"
            >
                <!-- slot默认插槽，由外部进行循环逻辑和数据组装，组件会传递每次请求数据到外部 -->
                <slot></slot>
                <template #loading v-if="!privateList.length && loading && skeleton?.length">
                    <base-skeleton :list="skeleton"></base-skeleton>
                </template>
                <!-- slot为item的情况，由外部传入样式，内部控制循环逻辑，建议和default的slot二选一传递 -->
                <div :class="['base-list', props.contentClass]">
                    <!-- 瀑布流布局 -->
                    <template v-if="props.masonry">
                        <base-masonry v-bind="props.masonryConfig" :list="privateList" :init="masonryInit">
                            <template #item="{ row, index }">
                                <slot name="item" :row="row" :index="index"> </slot>
                            </template>
                        </base-masonry>
                    </template>
                    <!-- 普通布局 -->
                    <template v-else>
                        <div v-for="(item, index) in privateList" :key="index" class="base-list-item">
                            <slot name="item" :row="item" :index="index"> </slot>
                        </div>
                    </template>
                </div>
            </van-list>
        </template>
    </van-pull-refresh>
</template>

<script lang="ts" setup name="BaseList">
import BaseSkeleton from "../base-skeleton/index.vue";
const props = withDefaults(
    defineProps<{
        //是否瀑布流
        masonry?: boolean;
        //瀑布流配置
        masonryConfig?: null | { gutter?: number; columns?: number };
        //内容样式
        contentClass?: string;
        //是否允许下拉
        pull?: boolean;
        //构造请求
        // eslint-disable-next-line @typescript-eslint/ban-types
        req?: null | { fn: Function; params?: Record<string, any> };
        //数据存在的key，比如返回数据是{code:200,data:{rows:[],total:100},msg:'xxx'}，则传递rows，如果还在rows下面层级，则传递rows.xxx.xx.xx，依此递归
        rowKey?: string;
        //焦点key，防止多个列表共存的情况下，重复加载（传入active的时候，必须同时传入key）
        active?: string | number;
        //双向绑定,list数据
        list?: any[];
        //空状态页类型
        emptyType?: string;
        //空状态页image，支持vant默认
        emptyImage?: string;
        //空状态描述
        emptyDesc?: string;
        //加载完成提示文案
        finishedText?: string;
        //分页数量
        size?: number;
        //分页page变量
        pageKey?: string;
        //分页size变量
        sizeKey?: string;
        //骨架屏数据
        skeleton?: InstanceType<typeof BaseSkeleton>["$props"]["list"];
    }>(),
    {
        masonry: false,
        masonryConfig: null,
        contentClass: "",
        pull: true,
        req: null,
        rowKey: "",
        active: "",
        list: () => [],
        emptyType: "result",
        emptyImage: "",
        emptyDesc: "",
        finishedText: "没有更多数据了",
        size: 10,
        pageKey: "page",
        sizeKey: "size"
    }
);

//当前页
let page = ref(1);
//是否结束
let finished = ref(false);
//列表加载状态
let loading = ref(false);
//下拉加载提示
let refreshLoading = ref(false);
//是否加载失败
let error = ref(false);
//内部list
let privateList = reactive<any[]>([]);

const masonryInit = computed(() => {
    return page.value === 1;
});

const isEmpty = computed(() => {
    //空状态刷新时，保持状态
    if (refreshLoading.value && privateList.length === 0) {
        return true;
    }
    return page.value > 1 && privateList.length === 0 && loading.value === false && error.value === false;
});

const emits = defineEmits<{
    (e: "update:list", value: any[]): void;
    (e: "export", value: any): void;
}>();

/** 监听传参，触发重新加载 */
watch(
    () => props.req,
    () => {
        loading.value = true;
        privateList.length = 0;
        emits("update:list", []);
        nextTick(() => {
            listMore("init");
        });
    },
    {
        deep: true
    }
);

/** 对带初始值的双向绑定进行判断 */
onMounted(() => {
    if (props.list?.length && props.req) {
        console.warn("存在req请求时候，将过滤双向绑定的初始值，请在请求后进行处理");
    }
    if (props.list?.length && !props.req) {
        privateList.push(...props.list);
    }
    listMore("init");
});

const vnodeKey = computed(() => {
    return getCurrentInstance()?.vnode.key;
});

//加载逻辑判断
const listMore = async (type: "init" | "refresh" | "more"): Promise<void> => {
    if (!props.req) {
        loading.value = false;
        finished.value = true;
        page.value = 2;
        console.warn("当前base-table未传入req方法，请注意");
        return;
    }
    if (vnodeKey.value && props.active && vnodeKey.value !== props.active) {
        //如果同时传入了key和active，则进行匹配校验，非活动状态的base-list组件，拒绝请求
        console.warn(`base-list组件当前未激活，请注意传入的key：${String(vnodeKey.value)}和active：${props.active}`);
        return;
    }
    if (type === "init" || type === "refresh") {
        page.value = 1;
        //如果是初始化的时候，提前设置为未完成
        if (type === "init") {
            loading.value = true;
            finished.value = false;
        }
        //设置list组件加载状态为true，防止触发list的onload方法
        loading.value = true;
    }
    try {
        error.value = false;
        const params = { ...props.req.params };
        params[props.pageKey] = page.value;
        params[props.sizeKey] = props.size;
        const res = await props.req.fn(params);
        page.value = page.value + 1;
        if (type === "init" || type === "refresh") {
            if (type === "init") {
                privateList.length = 0;
                emits("update:list", []);
            }
        }
        // 传递每次请求的数据到外部,用于数据二次封装和外部循环逻辑
        emits("export", res);
        let _list = res;
        if (props.rowKey) {
            const rowKeyArr = props.rowKey.split(".");
            rowKeyArr.forEach((item) => {
                if (_list?.[item] === undefined) {
                    console.warn(_list);
                    throw new Error(`row-key：${props.rowKey}不存在，请检查`);
                }
                _list = _list[item];
            });
        }
        if (!Array.isArray(_list)) {
            console.warn(_list);
            throw new Error(`base-list获取数据非数组，请检查返回结果或设置row-key`);
        }
        if (type === "refresh") {
            privateList.length = 0;
        }
        privateList.push(..._list);
        emits("update:list", privateList);
        loading.value = false;
        refreshLoading.value = false;
        finished.value = _list.length < (props.size || 10);
    } catch (e) {
        console.error(`获取列表数据失败:`, e);
        const str = String(e);
        if (str.indexOf("当前请求已取消") !== -1 || str.indexOf("请求过快，已拦截") !== -1) {
            return;
        }
        refreshLoading.value = false;
        finished.value = false;
        loading.value = false;
        error.value = true;
    }
};
/**暴露主动刷新事件 */
const refresh = (): void => {
    listMore("refresh");
};

defineExpose({
    refresh
});
</script>

<style lang="scss" scoped>
.fill-available {
    min-height: stretch;
}
.base-list {
    min-height: 100% !important;
}
.empty-wrapper {
    height: 50vh;
    .van-empty {
        top: auto;
    }
}
</style>
