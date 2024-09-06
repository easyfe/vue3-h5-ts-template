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
import { useLocale } from "@/hooks/useLocale";
import { Locale } from "vant";
// 引入英文语言包
import enUS from "vant/es/locale/lang/en-US";
import zhCn from "vant/es/locale/lang/zh-CN";

const { currentLocale } = useLocale();
const route = useRoute();
//动画效果
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

watch(
    () => currentLocale.value,
    (val) => {
        if (val === "en-US") {
            // 设置英文语言包
            Locale.use("en-US", enUS);
        } else {
            // 设置中文语言包
            Locale.use("zh-CN", zhCn);
        }
    },
    {
        immediate: true
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
