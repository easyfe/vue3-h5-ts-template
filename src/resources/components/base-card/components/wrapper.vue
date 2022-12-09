<template>
    <div class="base-cell-warpper" :style="cellConfig.wrapperClass">
        <slot name="default-content"></slot>
    </div>
</template>

<script lang="ts" setup>
import { CardProp } from "types";

defineProps({
    cellConfig: {
        type: Object
    }
});
</script>

<style lang="scss" scoped>
.base-cell-warpper {
    border-radius: 12px;
    background-color: #fff;
    overflow: hidden;
}
</style>
