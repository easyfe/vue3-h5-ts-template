<template>
    <van-form
        ref="baseForm"
        class="base-form"
        v-bind="$attrs"
        :label-align="props.labelAlign"
        :input-align="props.inputAlign"
        :error-message-align="props.errorMessageAlign"
    >
        <template v-for="group in props.config" :key="group.name">
            <base-input v-if="group.inputType === 'input'" v-model.trim="model[group.name]" v-bind="group"></base-input>
            <base-action v-if="group.inputType === 'action'" v-model="model[group.name]" v-bind="group"> </base-action>
            <base-date v-if="group.inputType === 'datetime'" v-model="model[group.name]" v-bind="group"></base-date>
            <base-area v-if="group.inputType === 'area'" v-model="model[group.name]" v-bind="group"></base-area>
            <base-uploader v-if="group.inputType === 'uploader'" v-model="model[group.name]" v-bind="group">
                <!-- 通过默认插槽可以自定义上传区域的样式。 -->
                <template #uploader>
                    <slot name="uploader"></slot>
                </template>
            </base-uploader>
            <base-checkbox
                v-if="group.inputType === 'checkbox'"
                v-model="model[group.name]"
                :options="group.options"
                v-bind="group"
            ></base-checkbox>
            <base-radio
                v-if="group.inputType === 'radio'"
                v-model="model[group.name]"
                :options="group.options"
                v-bind="group"
            ></base-radio>
            <base-switch v-if="group.inputType === 'switch'" v-model="model[group.name]" v-bind="group"></base-switch>
            <template v-if="group.inputType === 'slot'">
                <slot :name="group.name"></slot>
            </template>
        </template>
    </van-form>
</template>

<script setup lang="ts" name="BaseForm">
import type { FormInstance } from "vant";
const props = withDefaults(
    defineProps<{
        config: Record<string, any>[];
        modelValue: any;
        labelAlign?: "center" | "left";
        inputAlign?: "center" | "right";
        errorMessageAlign?: "center" | "right";
    }>(),
    {
        labelAlign: "left",
        inputAlign: "right",
        errorMessageAlign: "right"
    }
);

const emits = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (newVal) => {
        emits("update:modelValue", newVal);
    }
});
const baseForm = ref<FormInstance | null>(null);
const validate = (name?: string | string[]): any => {
    return baseForm.value?.validate(name);
};
const resetValidation = (name?: string | string[]): void => {
    baseForm.value?.resetValidation(name);
};
const submit = (): void => {
    validate();
};
defineExpose({
    validate,
    resetValidation,
    submit
});
</script>

<style lang="scss" scoped>
.base-form {
    :deep(.van-cell-group):not(:last-child) {
        margin-bottom: 20px;
    }
    :deep(.van-field__label) {
        color: #000;
        font-size: 28px;
    }
    :deep(.van-field__control) {
        color: #666;
    }
}
</style>
