<template>
    <div id="BaseProgress" class="base-progress">
        <!-- 插槽 -->
        <slot name="other" class="other"></slot>
        <!-- 进度条 CONTENT -->
        <div
            class="progress-box"
            :style="{
                width: strokeWidth ? getRealPx(strokeWidth) : '100%',
                height: getRealPx(strokeHidth),
                borderRadius: getRealPx(Number(strokeHidth) / 2)
            }"
        >
            <div
                class="progress"
                :style="{
                    borderWidth: '1px',
                    borderColor: trackBorderColor,
                    lineHeight: getRealPx(strokeHidth),
                    borderRadius: getRealPx(Number(strokeHidth) / 2)
                }"
            >
                <div
                    class="progress-1"
                    :style="{
                        color: textColor,
                        textAlign: textPosition,
                        background: trackColor
                    }"
                >
                    {{ pivotText ? pivotText : Number(percentage / 100) * 100 + " %" }}
                </div>
                <div
                    class="progress-2"
                    :style="{
                        background: color,
                        left: '-' + Number(100 - percentage) + '%',
                        borderRadius: getRealPx(Number(strokeHidth) / 2)
                    }"
                >
                    <div
                        class="progress-2-inner"
                        :style="{
                            color: coverTextColor,
                            textAlign: textPosition,
                            left: Number(100 - percentage) + '%'
                        }"
                    >
                        {{ pivotText ? pivotText : Number(percentage / 100) * 100 + " %" }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import handleGetRealPx from "@/utils/tools/get-realpx/index";

const props = defineProps({
    /**
     * @param {number | string} 进度条宽度(传入设计稿标注大小(iphone6为标准))  单位:px
     */
    strokeWidth: {
        type: [String, Number],
        default: ""
    },
    /**
     * @param {number | string} 进度条高度(传入设计稿标注大小(iphone6为标准))   单位:px
     */
    strokeHidth: {
        type: [String, Number],
        default: 40
    },
    /**
     * @param {string} 进度条颜色
     * 可传渐变 如 color="linear-gradient(to right, #be99ff, #7232dd)"
     */
    color: {
        type: String,
        default: "#1989fa"
    },
    /**
     * @param {string} 轨道颜色
     */
    trackColor: {
        type: String,
        default: "#eeeeee"
    },
    /**
     * @param {string} 轨道边框颜色 ，默认red
     */
    trackBorderColor: {
        type: String,
        default: "red"
    },
    /**
     * @param {string} 进度文字颜色
     */
    textColor: {
        type: String,
        default: "#000000"
    },
    /**
     * @param {string}  覆盖进度条上面文字颜色
     */
    coverTextColor: {
        type: String,
        default: "white"
    },
    /**
     * @param {string} 进度文字位置 可选值 【left、 right 、center】
     */
    textPosition: {
        type: String,
        default: "center"
    },
    /**
     * @param {number | string}  进度百分比
     */
    percentage: {
        type: [Number, String],
        default: 50
    },
    /**
     * @param {string}  进度文字内容  默认百分比
     */
    pivotText: {
        type: String
    }
});

let progressWidth = ref(0);

/**
 * 获取真实像素大小
 * @param px 传入设计稿标注大小(iphone6为标准)
 * @returns
 */
const getRealPx = (px: number): string => {
    return parseInt(handleGetRealPx(px) + "") + "px";
};

/**
 * 重绘组件
 */
const resize = (): void => {
    // this.$nextTick(function () {
    //     const _w = (this.$el as any).offsetWidth;
    //     this.progressWidth = _w;
    // });
};
</script>

<style lang="scss" scoped>
.base-progress {
    .progress-box {
        margin: 0 auto;
        width: 100%;
        font-size: 20px;
    }
    .progress {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-style: solid;
        z-index: 1;
    }
    .progress-1 {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 0 10px;
    }
    .progress-2 {
        position: relative;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        overflow: hidden;
    }
    .progress-2-inner {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 0 10px;
    }
}
</style>
