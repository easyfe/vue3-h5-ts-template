<template>
    <van-config-provider theme="light">
        <div class="root" @touchmove="handleTouch">
            <router-view v-slot="{ Component }">
                <transition :name="transitionName">
                    <keep-alive :include="keepList">
                        <component :is="Component" :key="route.name" />
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </van-config-provider>
</template>
<script lang="ts" setup>
import { closeNotify, closeToast } from "vant";
import { _TouchEvent } from "types";
import { clearRequest } from "@/packages/request";
import global from "@/config/pinia/global";
const route = useRoute();
//动画效果P
const transitionName = computed(() => {
    return global().transitionName;
});
//需要缓存的页面name
const keepList = computed(() => {
    return global().keepaliveList;
});
/** 允许页面内部body的touchmove事件 */
const handleTouch = (e: _TouchEvent): void => {
    e._isScroller = true;
};
watch(
    () => route.path,
    () => {
        /**路由切换时，删除请求队列*/
        clearRequest();
        /** 路由切换的时候清除相关提示 */
        closeToast();
        closeNotify();
    }
);
</script>
<style lang="scss" scoped>
.root {
    background-color: var(--van-background);
    height: 100vh;
    overflow-y: auto;
    font-size: 14px;
}
</style>
