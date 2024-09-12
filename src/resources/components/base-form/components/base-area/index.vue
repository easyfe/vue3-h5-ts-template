<template>
    <van-cell class="base-area_wrapper">
        <van-field
            v-model.trim="showName"
            class="base-area"
            :placeholder="placeholder"
            v-bind="$attrs"
            readonly
            @click="handleShowPop"
        >
        </van-field>
        <van-popup v-model:show="visible" position="bottom" closeable round>
            <van-cascader
                v-model="cascaderValue"
                class="cascader"
                title="请选择所在地区"
                :field-names="fieldNames"
                :options="areaList"
                :closeable="false"
                @cancel="visible = false"
                @finish="onFinish"
            />
        </van-popup>
    </van-cell>
</template>

<script setup lang="ts" name="BaseArea">
import { getArea, _RegArea } from "@/config/apis/common";

interface Props {
    //绑定的省市区的值
    // modelValue: (string | number)[];
    //占位提示
    placeholder?: string;
    //自定义 options 结构中的字段
    fieldNames?: {
        text: string;
        value: string;
        children: string;
    };
    //选择结果连接符
    join?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    placeholder: "请选择",
    fieldNames: () => {
        return { text: "text", value: "value", children: "children" };
    },
    join: "/"
});

const model = defineModel<(string | number)[]>({ required: true });

//省市区列表
let areaList = reactive<_RegArea[]>([]);

let visible = ref(false);

//级联选择器绑定的值，只需要提供最后一级选择器的值即可，可以自动定位
let cascaderValue = ref<string | number>("");

const showName = computed(() => {
    if (model.value.includes(0)) {
        cascaderValue.value = "";
        return "";
    }
    cascaderValue.value = model[model.value.length - 1];
    const map = flatArray(areaList);
    const str = model.value.reduce((res, key) => {
        if (!map[key]) {
            return "";
        }
        return res + "/" + map[key];
    }, "");
    return str.substr(1);
});

/**
 * 省市区数组转成{value:label}对象格式,
 * {1: "北京市"
 * 2: "北京市"
 * 3: "东城区"
 * 4: "西城区"
 * 5: "朝阳区"
 * 6: "丰台区"
 * 7: "石景山区"}
 * @param arr
 */
const flatArray = (arr: any[]): any => {
    const result = {} as any;
    const flat = function (node: any, parentNode?: any): any {
        result[node[props.fieldNames.value]] = node[props.fieldNames.text];
        if (node[props.fieldNames.children] && node[props.fieldNames.children].length) {
            node[props.fieldNames.children].forEach((item: any) => {
                flat(item, node);
            });
        }
    };
    arr.forEach((item) => {
        flat(item);
    });
    return result;
};

const handleShowPop = (): void => {
    visible.value = true;
};
const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();
const onFinish = ({ selectedOptions }: any): void => {
    visible.value = false;
    const locationList = selectedOptions.map((cur: any) => {
        return cur[props.fieldNames?.value];
    }, "");
    emits("update:modelValue", locationList);
};

onMounted(() => {
    getArea().then((res) => {
        areaList.length = 0;
        areaList.push(...res);
    });
});
</script>

<style lang="scss" scoped>
.base-area_wrapper {
    padding: 0;
    &::after {
        border-color: #ededed;
    }
}
</style>
