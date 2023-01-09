<template>
    <van-field class="base-checkbox" v-bind="$attrs" v-on="$attrs">
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
        modelValue: any[];
        options: any[];
    }>(),
    {}
);

const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (newVal) => {
        emits("update:modelValue", newVal);
    }
});
</script>

<style lang="scss" scoped>
.base-checkbox::after {
    border-color: #ededed;
}
</style>
