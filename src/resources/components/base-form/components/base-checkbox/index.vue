<template>
    <van-field class="base-checkbox" :placeholder="placeholder" v-bind="$attrs" v-on="$attrs">
        <template #input>
            <van-checkbox-group v-model="model" direction="horizontal">
                <van-checkbox v-for="item in options" :key="item.value" :name="item.value" shape="square">
                    {{ item.label }}
                </van-checkbox>
            </van-checkbox-group>
        </template>
    </van-field>
</template>

<script setup lang="ts" name="BaseCheckbox">
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => {
            return [];
        }
    },
    placeholder: {
        type: String,
        default: "请输入"
    },
    options: {
        type: Array,
        default: () => {
            return [];
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
.base-checkbox::after {
    border-color: #ededed;
}
</style>
