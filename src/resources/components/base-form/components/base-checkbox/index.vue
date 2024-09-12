<template>
    <van-field class="base-checkbox" v-bind="$attrs">
        <template #input>
            <van-checkbox-group v-model="model" v-bind="$attrs" direction="horizontal">
                <van-checkbox v-for="item in props.options" :key="item.value" :name="item.value" shape="square">
                    {{ item.label }}
                </van-checkbox>
            </van-checkbox-group>
        </template>
    </van-field>
</template>

<script setup lang="ts" name="BaseCheckbox">
const props = withDefaults(
    defineProps<{
        options: any[];
    }>(),
    {}
);

const model = defineModel<any[]>({ required: true });
</script>

<style lang="scss" scoped>
.base-checkbox::after {
    border-color: #ededed;
}
</style>
