<template>
    <van-field v-model.trim="model" class="base-input" placeholder="请输入" v-bind="$attrs"> </van-field>
</template>

<script setup lang="ts" name="BaseInput">
const model = defineModel<string | number>({ required: true, default: "" });
</script>

<style lang="scss" scoped>
.base-input::after {
    border-color: #ededed;
}
</style>
