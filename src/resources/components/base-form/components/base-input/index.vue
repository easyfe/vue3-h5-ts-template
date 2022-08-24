<template>
    <van-field v-model.trim="model" class="base-input" :placeholder="placeholder" v-bind="$attrs" v-on="$attrs">
    </van-field>
</template>

<script setup lang="ts" name="BaseInput">
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ""
    },
    placeholder: {
        type: String,
        default: "请输入"
    }
});

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
.base-input::after {
    border-color: #ededed;
}
</style>
