<template>
    <div class="base-product-list">
        <!-- 标题-->
        <!-- 插槽形式注入 -->
        <template v-if="$slots.top">
            <slot name="top"></slot>
        </template>
        <!-- props注入 -->
        <template v-else-if="title">
            <div class="product-card-title">{{ title }}</div>
        </template>

        <!-- 商品信息item组件插槽形式注入 -->
        <template v-if="$slots.item_card">
            <slot name="item_card"></slot>
        </template>

        <!-- 底部插槽 -->
        <template v-if="$slots.bottom">
            <slot name="bottom"></slot>
        </template>
    </div>
</template>

<script setup lang="ts" name="TheProductList">
defineProps({
    /**
     * @param {string} 标题，也可以通过 slot="title" 设置
     */
    title: {
        type: String,
        default: ""
    }
});
</script>

<style lang="scss" scoped>
.base-product-list {
    // width: 710px;
    height: auto;
    background: #ffffff;
    border-radius: 16px;
    margin: 0 auto;
    padding: 10px;
    .product-card-title {
        height: 29px;
        font-size: 30px;
        font-weight: 500;
        color: #000000;
        line-height: 30px;
        padding: 0 10px;
        margin: 15px 0;
    }
}
</style>
