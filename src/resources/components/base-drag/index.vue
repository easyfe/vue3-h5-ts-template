<template>
    <div
        ref="baseDrag"
        class="base-drag"
        :class="[animation ? 'base-drag-animation' : '']"
        @touchstart="dvStart"
        @touchmove="dvMove"
        @touchend="dvEnd"
        @touchcancel="dvEnd"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts" setup name="BaseDrag">
import lodash from "@/utils/tools/lodash";

const props = defineProps({
    /** 默认x轴百分比 */
    x: {
        type: Number,
        default: 80
    },
    /** 默认y轴百分比 */
    y: {
        type: Number,
        default: 85
    },
    /** 自动吸附 */
    autoAds: {
        type: Boolean,
        default: false
    }
});

let animation = ref(false);

const baseDrag = ref(null);

/** 触摸开始 */
let touchStartTime = ref<number>(0);

/** 触摸实体 */
let toucheEvent = ref<TouchEvent>();

const emits = defineEmits<{
    (e: "click"): void;
}>();

/** div触发 */
const dvStart = (e: TouchEvent): void => {
    e.preventDefault();
    touchStartTime.value = new Date().getTime();
};
/** div移动 */
const dvMove = (e: TouchEvent): void => {
    toucheEvent.value = e;
    throttleMove();
};
/** 节流 */
const throttleMove = lodash.throttle(() => {
    if (toucheEvent.value) {
        doMove(toucheEvent.value);
    }
}, 10);

/** 安全区宽度 */
const screenWidth = ref(0);
/** 安全区高度 */
const screenHeight = ref(0);

/** 实际宽度 */
let realScreenWidth = ref(0);
/** 实际高度 */
let realScreenHeight = ref(0);

/** 最终x位置 */
let endX = ref(0);
/** 最终y位置 */
let endY = ref(0);

onMounted(() => {
    const app = document.getElementById("app");
    realScreenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    realScreenHeight.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (!app) {
        screenWidth.value = realScreenWidth.value;
        screenHeight.value = realScreenHeight.value;
        return;
    }
    screenWidth.value = app.clientWidth;
    screenHeight.value = app.clientHeight;
    const dv = baseDrag.value as null | HTMLElement;
    if (!dv) {
        return;
    }
    dv.style.transform = `translate3d(${screenWidth.value * (props.x / 100)}px,${
        screenHeight.value * (props.y / 100)
    }px,0)`;
});

const updateEle = (e: TouchEvent, action: "move" | "end" = "move"): void => {
    const dv = baseDrag.value as null | HTMLElement;
    if (!dv) {
        return;
    }
    if (action === "end") {
        if (props.autoAds) {
            animation.value = true;
            if (endX.value <= (screenWidth.value - dv.clientWidth) / 2) {
                dv.style.transform = `translate3d(0,${endY.value}px,0)`;
            } else {
                dv.style.transform = `translate3d(${screenWidth.value - dv.clientWidth}px,${endY.value}px,0)`;
            }
        }
        return;
    }
    let pageX = e.touches[0].pageX;
    let pageY = e.touches[0].pageY;
    /** 兼容PC端拖拽 */
    if (realScreenWidth.value > 800) {
        pageX = pageX - (realScreenWidth.value - screenWidth.value) / 2;
        pageY = pageY - (realScreenHeight.value - screenHeight.value) / 2;
    }
    const x = pageX - dv.clientWidth / 2;
    const y = pageY - dv.clientHeight / 2;
    endX.value = x;
    endY.value = y;
    /** 判断X轴边界 */
    if (x <= 0 || x >= screenWidth.value - dv.clientWidth) {
        return;
    }
    /** 判断Y轴边界 */
    if (y <= 0 || y >= screenHeight.value - dv.clientHeight) {
        return;
    }
    dv.style.transform = `translate3d(${x}px,${y}px,0)`;
};

/** 执行移动 */
const doMove = (e: TouchEvent): void => {
    animation.value = false;
    updateEle(e);
};
// div结束移动
const dvEnd = (e: TouchEvent): void => {
    updateEle(e, "end");
    /** 通过结束移动的时间，判断是否是点击事件 */
    if (new Date().getTime() - touchStartTime.value < 200) {
        emits("click");
        return;
    }
};
</script>
<style lang="scss" scoped>
.base-drag {
    position: absolute;
    will-change: transform;
}
.base-drag-animation {
    transition: all 0.3s;
}
</style>
