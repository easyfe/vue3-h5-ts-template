<template>
    <van-field class="base-radio" v-bind="$attrs" v-on="$attrs">
        <template #input>
            <van-radio-group v-model="model" direction="horizontal">
                <van-radio v-for="item in options" :key="item.value" :name="item.value">{{ item.label }}</van-radio>
            </van-radio-group>
        </template>
    </van-field>
</template>

<script setup lang="ts" name="BaseRadio">
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
.base-radio::after {
    border-color: #ededed;
}
</style>
