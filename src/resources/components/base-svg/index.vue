<template>
    <img v-if="isHttp" :src="props.name" :style="getUrlSvgStyle" class="svg-filter" />
    <svg v-else :class="svgClass" aria-hidden="true" :style="svgStyle">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script lang="ts" setup name="BaseSvg">
import { hexToCSSFilter } from "hex-to-css-filter";
import getRealPx from "@/utils/tools/get-realpx";

const props = defineProps({
    /** 名称，链接 */
    name: {
        type: String,
        default: ""
    },
    /** 宽度 */
    width: {
        type: [Number, String],
        default: ""
    },
    /** 高度 */
    height: {
        type: [Number, String],
        default: ""
    },
    /** 颜色 */
    color: {
        type: String,
        default: ""
    },
    /** 可视化以375设计稿为准，结合postcss实际设置处理 */
    ksh: {
        type: Boolean,
        default: false
    }
});
/** 拼接svg名称 */
const iconName = computed(() => {
    return `#svg-${props.name}`;
});
const svgClass = ref("svg-icon");
/** 拼接svg样式 */
const svgStyle = computed(() => {
    return {
        width: props.width ? getRealPx(Number(props.width) * (props.ksh ? 2 : 1)) + "px" : "inherit",
        height: props.height ? getRealPx(Number(props.height) * (props.ksh ? 2 : 1)) + "px" : "inherit",
        color: props.color || "inherit"
    };
});
const svgfilter = computed(() => {
    if (!props.name || !props.color) {
        return "";
    }
    if (!/^(#)((?:[A-Fa-f0-9]{3}){1,2})$/.test(props.color)) {
        console.error("base-svg匹配hex颜色失败：", props.color);
        return "";
    }
    const cssFilter = hexToCSSFilter(props.color).filter.replace(";", "");
    return cssFilter;
});
const isHttp = computed(() => {
    return /^http(s)?:\/\/.*$/.test(props.name);
});
/** 设置url格式引入svg的样式 */
const getUrlSvgStyle = computed(() => {
    return {
        width: props.width ? getRealPx(Number(props.width) * (props.ksh ? 2 : 1)) + "px" : "inherit",
        height: props.height ? getRealPx(Number(props.height) * (props.ksh ? 2 : 1)) + "px" : "inherit"
    };
});
</script>

<style lang="scss" scoped>
.svg-filter {
    filter: v-bind("svgfilter");
}
.svg-icon {
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
