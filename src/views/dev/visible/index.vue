<template>
    <frame-view>
        <h4>测试页面隐藏显示监听，请锁屏或隐藏浏览器后重新打开</h4>
        <h5>页面隐藏时间：{{ hideTime }}</h5>
        <base-page-visible @visible="show" @hidden="hidden"></base-page-visible>
    </frame-view>
</template>

<script lang="ts" setup>
import BasePageVisible from "@/resources/components/base-page-visible/index.vue";
import { showSuccessToast } from "vant";
let hideTime = ref<number | Date>(0);
const show = (): void => {
    showSuccessToast("页面已加载");
};
const hidden = (): void => {
    hideTime.value = new Date();
};
</script>

<style lang="scss" scoped>
h4 {
    padding: 50px;
    font-size: 40px;
}
h5 {
    padding: 50px;
    font-size: 30px;
}
</style>
