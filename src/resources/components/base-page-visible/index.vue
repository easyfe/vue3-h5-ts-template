<template>
    <div class="page-visible"></div>
</template>
<script setup lang="ts">
const emits = defineEmits<{
    (e: "hidden"): void;
    (e: "visible"): void;
}>();
const handleVisible = (e: any): void => {
    if (e.target.visibilityState === "hidden") {
        // 页面隐藏
        emits("hidden");
    }
    if (e.target.visibilityState === "visible") {
        // 页面显示
        emits("visible");
    }
};

onMounted(() => {
    // 监听页面隐藏和显示状态
    document.addEventListener("visibilitychange", handleVisible);
});

onBeforeUnmount(() => {
    document.removeEventListener("visibilitychange", handleVisible);
});
</script>
