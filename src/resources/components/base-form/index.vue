<template>
    <van-form ref="baseForm" class="base-form" v-bind="form">
        <template v-for="(item, index) in formItems" :key="index">
            <van-cell-group :border="false">
                <template v-for="group in item.groups" :key="group.name">
                    <base-input
                        v-if="group.inputType === 'input'"
                        v-model.trim="model[group.name]"
                        v-bind="group"
                    ></base-input>
                    <base-input
                        v-if="group.inputType === 'textarea'"
                        v-model.trim="model[group.name]"
                        type="textarea"
                        v-bind="group"
                    ></base-input>
                    <base-action v-if="group.inputType === 'action'" v-model="model[group.name]" v-bind="group">
                    </base-action>
                    <base-datetime
                        v-if="group.inputType === 'datetime'"
                        v-model="model[group.name]"
                        v-bind="group"
                    ></base-datetime>
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
                        v-bind="group"
                    ></base-checkbox>
                    <base-radio
                        v-if="group.inputType === 'radio'"
                        v-model="model[group.name]"
                        v-bind="group"
                    ></base-radio>
                    <base-switch
                        v-if="group.inputType === 'switch'"
                        v-model="model[group.name]"
                        v-bind="group"
                    ></base-switch>
                    <template v-if="group.inputType === 'slot'">
                        <slot :name="group.name" :form-item="group" :model="model"></slot>
                    </template>
                </template>
            </van-cell-group>
        </template>
    </van-form>
</template>

<script setup lang="ts" name="BaseForm">
import type { FormInstance } from "vant";
const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
        default: () => {
            return {};
        }
    },
    // form配置
    form: {
        type: Object,
        default: () => {
            return {
                labelAlign: "left", //表单项 label 对齐方式，可选值为 left center right
                inputAlign: "right", //输入框对齐方式，可选值为left center right
                errorMessageAlign: "right" //错误提示文案对齐方式，可选值为left center right
            };
        }
    },
    // form-item配置
    formItems: {
        type: Array,
        default: () => {
            return [];
        }
    }
});

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
