<template>
    <svg :class="svgClass" aria-hidden="true" :style="svgStyle">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script lang="ts" setup>
import getRealPx from "@/utils/tools/get-realpx";

const props = defineProps({
    /** 名称 */
    name: {
        type: String
    },
    /** 宽度 */
    width: {
        type: [Number, String]
    },
    /** 高度 */
    height: {
        type: [Number, String]
    },
    /** 颜色 */
    color: {
        type: String
    }
});
/** 拼接svg名称 */
const iconName = ref(`#svg-${props.name}`);
const svgClass = ref("svg-icon");
/** 拼接svg样式 */
const svgStyle = reactive({
    width: props.width ? getRealPx(Number(props.width)) : "inherit",
    height: props.height ? getRealPx(Number(props.height)) : "inherit",
    color: props.color || "inherit"
});
</script>

<style lang="scss" scoped>
.svg-icon {
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
