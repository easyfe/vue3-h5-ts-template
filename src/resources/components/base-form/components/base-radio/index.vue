<template>
    <van-field class="base-radio" v-bind="$attrs">
        <template #input>
            <van-radio-group v-model="model" direction="horizontal">
                <van-radio v-for="item in props.options" :key="item.value" :name="item.value">{{
                    item.label
                }}</van-radio>
            </van-radio-group>
        </template>
    </van-field>
</template>

<script setup lang="ts" name="BaseRadio">
const props = withDefaults(
    defineProps<{
        options: any[];
    }>(),
    {}
);

const model = defineModel<string | number>({ required: true });
</script>

<style lang="scss" scoped>
.base-radio::after {
    border-color: #ededed;
}
</style>
