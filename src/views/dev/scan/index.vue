<template>
    <frame-view>
        <div @click="show = true">点击扫码</div>
        <base-scan v-model="show" @success="onSuccess"></base-scan>
    </frame-view>
</template>
<script setup lang="ts">
import { showToast } from "vant";

let show = ref(false);
const onSuccess = (val: string): void => {
    showToast(val);
};
</script>
