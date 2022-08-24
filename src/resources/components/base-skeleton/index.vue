<template>
    <div class="skeleton skeleton_shine">
        <div
            v-for="(item, index) in list"
            :key="index"
            class="skeleton__item skeleton__item_shine"
            :style="getItemStyle(item)"
        ></div>
        <div class="skeleton__spinbox">
            <div class="skeleton__spin"></div>
        </div>
        <div class="skeleton__shine"></div>
    </div>
</template>
<script lang="ts" setup>
import getRealPx from "@/utils/tools/get-realpx";

interface ListDetail {
    width: number;
    height: number;
    top: number;
    left: number;
    right?: number;
    bottom?: number;
    radius?: number;
}
withDefaults(
    defineProps<{
        list: ListDetail[];
    }>(),
    {
        list: () => []
    }
);

const getItemStyle = (item: ListDetail): any => {
    return {
        width: `${getRealPx(item.width)}px`,
        height: `${getRealPx(item.height)}px`,
        top: `${getRealPx(item.top)}px`,
        left: `${getRealPx(item.left)}px`,
        borderRadius: `${getRealPx(item.radius || 0)}px`
    };
};
</script>
<style lang="scss">
.skeleton {
    position: relative;
    overflow: hidden;
    background-color: #fff;
    width: 100vw;
    height: 100vh;
}

.skeleton__item {
    position: absolute;
    background-color: #efefef;
}
.skeleton__item_bg {
    background-color: #f5f6f7;
    border-radius: 12px;
}
.skeleton__item_rect {
    background-color: #f5f6f7;
    border-radius: 12px;
}
.skeleton__item_circle {
    background-color: #f5f6f7;
    border-radius: 200px;
}

/* spin start */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.skeleton__spinbox {
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 9999;
    display: none;
}
.skeleton__spin {
    display: inline-block;
    width: 64px;
    height: 64px;
}
.skeleton__spin:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #409eff;
    border-color: #409eff transparent #409eff transparent;
    animation: spin 1.2s linear infinite;
}

.skeleton_spin .skeleton__spinbox {
    display: flex;
}
/* spin end */

/* shine start */
@keyframes flush {
    0% {
        transform: translate(-100%, -100%) rotate(45deg);
    }
    100% {
        transform: translate(100%, 100%) rotate(45deg);
    }
}
.skeleton__shine {
    animation: flush 2s linear infinite;
    position: absolute;
    top: -50%;
    height: 200%;
    width: 500px;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 0.85) 50%,
        rgba(255, 255, 255, 0) 90%
    );
    display: none;
}

.skeleton_shine .skeleton__shine {
    display: block;
}
/* shine end */

/* chiaroscuro start */
@keyframes chiaroscuro {
    0% {
        opacity: 0.7;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.7;
    }
}

.skeleton_chiaroscuro .skeleton__item {
    animation-duration: 2s;
    animation-name: chiaroscuro;
    animation-iteration-count: infinite;
}
/* chiaroscuro end */
</style>
