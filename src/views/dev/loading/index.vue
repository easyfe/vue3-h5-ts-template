<template>
    <frame-view>
        <base-loading :loading="loading" :error="error" @retry="handleRetry">
            <p>加载完成</p>
        </base-loading>
    </frame-view>
</template>

<script lang="ts" setup>
import BaseLoading from "@/resources/components/base-loading/index.vue";

let loading = ref(true);
let error = ref(false);
const handleRetry = (): void => {
    init();
};

function init() {
    loading.value = true;
    error.value = false;
    setTimeout(() => {
        loading.value = false;
        error.value = true;
    }, 1500);
}
onMounted(() => {
    init();
});
</script>

<style lang="scss" scoped>
p {
    text-align: center;
    margin-top: 200px;
}
</style>
