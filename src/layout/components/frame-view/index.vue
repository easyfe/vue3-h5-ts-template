<template>
    <van-config-provider :theme-vars="privateThemeVars">
        <div
            class="frame-view"
            :class="[getSafeAreaTop ? '' : 'top-safe-area', showTabbar ? '' : 'bottom-safe-area']"
            :style="computedFrameStyle"
        >
            <!-- 头部导航  -->
            <van-nav-bar
                v-if="showNavbar"
                :title="!!props.opacity ? navTitle : ''"
                :fixed="props.immersion"
                :border="props.opacity / 100 >= 1"
                :style="{
                    paddingTop: `${getSafeAreaTop}px`,
                    backgroundColor: props.immersion ? `rgba(255, 255, 255,${props.opacity / 100})` : ''
                }"
                :left-arrow="!isFirstPage"
                @click-left="onClickLeft"
            >
                <template v-if="$slots['nav-right']" #right>
                    <slot name="nav-right"></slot>
                </template>
                <template v-if="$slots['nav-title']" #title>
                    <slot name="nav-title"></slot>
                </template>
                <template v-if="$slots['nav-left']" #left>
                    <slot name="nav-left"></slot>
                </template>
                <!-- <template v-for="(_, slotName) in $slots" #[slotName]>
                    <slot :name="slotName" />
                </template> -->
            </van-nav-bar>
            <!-- 内容区域 -->
            <div
                ref="myFrameContent"
                :class="['frame-view-content', props.contentClass]"
                :style="getContentStyle"
                @scroll="onScroll"
            >
                <template v-if="!error">
                    <base-loading v-if="loading" class="frame-view-loading"> </base-loading>
                    <slot v-else></slot>
                    <!-- 底部插槽 -->
                    <div v-if="$slots.footer" class="base-footer" ref="myFooter">
                        <slot name="footer"></slot>
                    </div>
                </template>
                <!-- 错误状态 -->
                <template v-else>
                    <base-empty :image="image" :type="type" :desc="desc"></base-empty>
                </template>
            </div>
            <!-- 底部tabbar -->
            <frame-tabbar v-if="showTabbar" class="frame-view-tabbar"></frame-tabbar>
        </div>
    </van-config-provider>
</template>

<script lang="ts" setup name="FrameView">
import uaHelper from "@/utils/helper/ua";
import back from "@/utils/tools/back";
import global from "@/config/pinia/global";
import { ConfigProviderThemeVars } from "vant";

const props = withDefaults(
    defineProps<{
        //内容样式
        contentClass?: string;
        //头部透明度
        opacity?: number;
        //沉浸式
        immersion?: boolean;
        //加载状态
        loading?: boolean;
        //错误状态
        error?: boolean;
        //空状态预定义类型 【注：仅当 error 设置为 true 的时候有效
        type?: string;
        //空状态自定义图片，同vant-empty接收的image
        image?: string;
        //空状态自定义描述  【注：仅当 error 设置为 true 的时候有效】
        desc?: string;
        //是否显示tabbar
        tabbar?: boolean;
        //头部title
        title?: string;
        //自定义背景色
        backgroundColor?: string;
        //页面背景图
        backgroundImage?: string;
        //是否展示navbar
        showNav?: boolean | undefined;
        //自定义返回
        customBack?: (() => void) | undefined;
        //主题配置
        themeVars?: ConfigProviderThemeVars | undefined;
    }>(),
    {
        contentClass: "",
        opacity: 100,
        immersion: false,
        loading: false,
        error: false,
        type: "result",
        image: "",
        desc: "",
        tabbar: false,
        title: "",
        backgroundColor: "",
        backgroundImage: "",
        showNav: undefined,
        customBack: undefined,
        themeVars: undefined
    }
);
const myFrameContent = ref();
const myFooter = ref();
const route = useRoute();
const isFirstPage = computed(() => {
    return history.state.isFirstPage;
});
const emits = defineEmits<{
    (e: "scroll", data: Event): void;
}>();
const privateThemeVars = computed(() => {
    const defaultThemeVars: ConfigProviderThemeVars = {
        navBarIconColor: "#000"
    };
    return { ...defaultThemeVars, ...props.themeVars };
});
//navbar标题
const navTitle = computed(() => {
    return props.title || (route?.meta?.title as string);
});
//计算frame-view的内联样式
const computedFrameStyle = computed(() => {
    const map: Record<string, any> = {
        backgroundColor: props.backgroundColor,
        backgroundImage: props.backgroundImage
    };
    // if (uaHelper.isAndroidApp) {
    //     map.paddingTop = `${getSafeAreaTop.value}px`;
    // }
    return map;
});
/** 获取顶部安全距离，针对APP场景*/
const getSafeAreaTop = computed(() => {
    if (uaHelper.inApp) {
        return global().safeAreaTop || 0;
    }
    return 0;
});
/** 计算是否需要显示navbar */
const showNavbar = computed(() => {
    if (uaHelper.isWemp || uaHelper.isWechat) {
        return false;
    }
    return props.showNav ?? true;
});
/** 计算是否需要显示tabbar */
const showTabbar = computed(() => {
    if (uaHelper.inApp) {
        return false;
    }
    return props.tabbar;
});
/** 计算content主体样式 */
const getContentStyle = ref({
    marginBottom: "0"
});

const slots = useSlots();

const onClickLeft = (): void => {
    if (slots["nav-left"]) {
        return;
    }
    if (props.customBack) {
        props.customBack();
    } else {
        back();
    }
};
const onScroll = (e: Event): void => {
    emits("scroll", e);
};

let resizeObserver: ResizeObserver | null = null;
onMounted(() => {
    document.title = navTitle.value;
    if (myFooter.value) {
        resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { height } = entry.contentRect;
                getContentStyle.value.marginBottom = `${height}px`;
            }
        });
        resizeObserver.observe(myFooter.value);
    }
});

onActivated(() => {
    nextTick(() => {
        let $content = myFrameContent.value;
        if (route.meta?.scrollId) {
            $content = document.querySelector(`#${route.meta?.scrollId}`);
        }
        if ($content && route.name) {
            $content.scrollTop = global().scrollTop[route.name.toString()] || 0;
        }
    });
});

onUnmounted(() => {
    if (resizeObserver && myFooter.value) {
        resizeObserver.unobserve(myFooter.value);
        resizeObserver = null;
    }
});
</script>
<style lang="scss" scoped>
.van-config-provider {
    height: 100%;
    width: 100%;
    position: absolute;
}
.frame-view {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 100%;
    height: 100%;
    .frame-view-header {
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        width: 100%;
        font-weight: 700;
        z-index: 48;
        font-size: 30px;
    }
    .frame-view-content {
        width: 100%;
        // -webkit-overflow-scrolling: touch;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        ::-webkit-scrollbar {
            display: none;
        }
        .frame-view-loading {
            height: 100%;
        }
    }
    .frame-view-tabbar.van-tabbar {
        min-height: 100px;
    }
    .base-footer {
        box-sizing: content-box;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
}
.top-safe-area {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
}
.bottom-safe-area {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
</style>
