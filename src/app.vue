<template>
    <div class="root" @touchmove="handleTouch">
        <router-view v-if="route.meta.keepAlive" v-slot="{ Component }">
            <transition :name="route.meta.keepAlive ? transitionName : ''">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
        <router-view v-else v-slot="{ Component }">
            <transition :name="route.meta.keepAlive ? '' : transitionName">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>
<script lang="ts" setup>
import { Toast, Notify } from "vant";
import { _TouchEvent } from "@/types";
import { clearRequest } from "@/packages/request";
import root from "@/config/pinia/root";
const route = useRoute();
const transitionName = computed(() => {
    return root().transitionName;
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
        Notify.clear();
        Toast.clear();
    }
);
</script>
<style lang="scss" scoped>
.root {
    background-color: #f4f5f6;
    height: 100%;
    overflow-y: auto;
}
</style>
