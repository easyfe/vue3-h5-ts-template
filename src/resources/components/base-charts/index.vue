<template>
    <div
        ref="baseCharts"
        class="base-charts"
        :style="{
            width: $width,
            height: $height
        }"
    ></div>
</template>

<script lang="ts" setup name="BaseCharts">
import getRealPx from "@/utils/tools/get-realpx/index";
import echarts from "@/config/echarts/index";
import chinaJSON from "@/config/echarts/map/chinaChange.json";

const baseCharts = ref(null);

const props = defineProps({
    /** 图例宽度 */
    width: {
        type: [String, Number],
        default: 600
    },
    /** 图例高度 */
    height: {
        type: [String, Number],
        default: 300
    },
    /** 图例配置项*/
    chartsOption: {
        type: Object,
        default: null,
        required: true
    },
    /**
     * 图表类型
     * 可选值：【map】
     */
    chartsType: {
        type: String,
        default: ""
    }
});

let charts = ref<null | any>(null);

/**  图例宽度 */
const $width = computed(() => {
    return props.width ? getRealPx(+props.width) + "px" : "100%";
});

/** 图例高度 */
const $height = computed(() => {
    return getRealPx(props.height ? +props.height : 300) + "px";
});

watch(
    () => props.chartsOption,
    () => {
        nextTick(() => {
            init_charts();
        });
    },
    {
        immediate: true
    }
);

const init_charts = (): void => {
    /**
     * 根据 chartsType 判断是当前图表类型是否是地图(map)
     * 注意：该动作必须放在 init 之前执行
     */
    if (props.chartsType === "map") {
        //初始化地图
        echarts.registerMap("china", chinaJSON);
    }

    // 基于准备好的dom，初始化echarts实例
    if (!baseCharts.value) {
        console.error("base-charts元素不存在");
        return;
    }
    charts = echarts.init(baseCharts.value);
    charts.setOption(props.chartsOption);
};
</script>

<style scoped lang="scss"></style>
