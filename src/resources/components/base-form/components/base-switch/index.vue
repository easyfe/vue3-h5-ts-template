<template>
    <van-field class="base-switch" :placeholder="placeholder" v-bind="$attrs" v-on="$attrs">
        <template #input>
            <van-switch v-model="model" v-bind="options" />
        </template>
    </van-field>
</template>

<script setup lang="ts" name="BaseSwitch">
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "请输入"
    },
    options: {
        type: Object,
        default: () => {
            return {
                size: "20px"
            };
        }
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
.base-switch::after {
    border-color: #ededed;
}
.van-switch--on {
    background-color: #f12f1a;
}
</style>
