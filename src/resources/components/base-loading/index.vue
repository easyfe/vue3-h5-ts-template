<template>
    <div class="base-loading">
        <div v-show="loading" class="loading">
            <div v-if="src" class="custom-wrapper">
                <img class="custom-loading-image" mode="widthFix" :src="src" />
                <div class="custom-loading-text">{{ text }}</div>
            </div>
            <div v-else class="spin">
                <div class="gk-loading">
                    <svg
                        viewBox="0 0 66 66"
                        xmlns="http://www.w3.org/2000/svg"
                        class="gk-loading-spinner"
                        style="width: 40px; height: 40px"
                    >
                        <circle
                            fill="none"
                            stroke-width="6"
                            stroke-linecap="round"
                            cx="33"
                            cy="33"
                            r="30"
                            class="gk-loading-path blue-loading"
                        ></circle>
                    </svg>
                </div>
            </div>
        </div>
        <div v-show="error" class="loading">
            <base-empty :type="props.type" :desc="props.desc">
                <van-button round type="danger" class="error-button" @click="handleRetry">重试</van-button>
            </base-empty>
        </div>
        <slot v-if="!loading && !error"></slot>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    //加载状态
    loading: {
        type: Boolean,
        default: true
    },
    //自定义图片地址
    src: {
        type: String,
        default: ""
    },
    //loading颜色
    color: {
        type: String,
        default: "#409eff"
    },
    //loading文字
    text: {
        type: String,
        default: ""
    },
    //加载错误
    error: {
        type: Boolean,
        default: false
    },
    //错误类型，同base-empty
    type: {
        type: String,
        default: "error"
    },
    //错误提示，同base-empty
    desc: {
        type: String,
        default: "加载失败"
    }
});
const emits = defineEmits<{
    (e: "retry"): void;
}>();
const handleRetry = (): void => {
    emits("retry");
};
</script>

<style lang="scss" scoped>
.loading {
    z-index: 9999;
    background-color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .custom-loading-image {
        width: 200px;
        display: block;
    }
    .custom-loading-text {
        color: #999999;
        font-size: 28px;
    }
    .spin {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16vw;
        height: 16vw;
        margin-bottom: 10vh;
    }
    .gk-loading {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        word-wrap: break-word;
        text-align: center;
        color: #fff;
    }
    .gk-loading .gk-loading-spinner {
        animation: circle-rotator 1.4s linear infinite;
    }
    .gk-loading .gk-loading-path {
        stroke-dasharray: 187;
        stroke-dashoffset: 0;
        transform-origin: center;
        -webkit-animation: circle-dash 1.4s ease-in-out infinite;
        animation: circle-dash 1.4s ease-in-out infinite;
    }
    .gk-loading .gk-loading-spinner * {
        line-height: 0;
        box-sizing: border-box;
    }
    .blue-loading {
        stroke: #1458d4;
    }
    @keyframes circle-rotator {
        0% {
            transform: rotate(0);
        }

        100% {
            transform: rotate(270deg);
        }
    }
    @keyframes circle-dash {
        0% {
            stroke-dashoffset: 187;
        }
        50% {
            stroke-dashoffset: 46.75;
            transform: rotate(135deg);
        }
        100% {
            stroke-dashoffset: 187;
            transform: rotate(450deg);
        }
    }
    .error-button {
        width: 320px;
        height: 80px;
    }
}
</style>
