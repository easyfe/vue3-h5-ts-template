<template>
    <frame-view>
        <base-drag :auto-ads="true" @click="handleClick">
            <div class="drag">拖我</div>
        </base-drag>
    </frame-view>
</template>
<script lang="ts" setup>
import { showToast } from "vant";

const handleClick = (): void => {
    showToast("触发点击事件");
};
</script>
<style lang="scss" scoped>
.drag {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    width: 120px;
    height: 120px;
    background-color: #3b3b3b;
    border-radius: 50%;
    color: #ffffff;
}
</style>
