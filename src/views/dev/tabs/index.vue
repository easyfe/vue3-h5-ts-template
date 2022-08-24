<template>
    <frame-view>
        <base-tabs :list="list" :active="1" @change="onChange">
            <template #default="{ row }">
                <div class="content">这是内容{{ row }}</div>
            </template>
        </base-tabs>
    </frame-view>
</template>
<script setup lang="ts">
const list = reactive([
    { label: "标签1", value: 1 },
    { label: "标签2", value: 2 },
    { label: "标签3", value: 3 },
    { label: "标签4", value: 4 },
    { label: "标签5", value: 5 },
    { label: "标签6", value: 6 },
    { label: "标签7", value: 7 },
    { label: "标签8", value: 8 },
    { label: "标签9", value: 9 }
]);
const onChange = (index: number): void => {
    console.log("当前tabs的index：", index);
};
</script>
<style scoped lang="scss">
.content {
    height: 1800px;
    background-color: #646566;
}
</style>
