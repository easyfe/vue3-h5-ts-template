<template>
    <van-form
        ref="baseForm"
        class="base-form"
        label-align="left"
        input-align="right"
        error-message-align="right"
        v-bind="props.formProps"
    >
        <template v-for="item in props.config" :key="item.name">
            <template v-if="handleCheckIf(item.if)">
                <template v-if="item.inputType === 'slot'">
                    <slot :name="item.name"></slot>
                </template>
                <component
                    v-else
                    :is="componentList[item.inputType]"
                    v-model="model[item.name]"
                    v-bind="item"
                ></component>
            </template>
        </template>
    </van-form>
</template>

<script setup lang="ts" name="BaseForm">
import type { FormInstance } from "vant";
import { FormProps } from "vant";
import componentList from "./components/index";
import { type } from "os";
const props = withDefaults(
    defineProps<{
        config: Record<string, any>[];
        formProps?: FormProps;
    }>(),
    {}
);

const model = defineModel<Record<string, any>>({ required: true, default: () => ({}) });

const baseForm = ref<FormInstance | null>(null);
const validate = (name?: string | string[]): any => {
    return baseForm.value?.validate(name);
};
const resetValidation = (name?: string | string[]): void => {
    baseForm.value?.resetValidation(name);
};
/** 检查是否显示 */
const handleCheckIf = (e: undefined | boolean | ((args: any) => boolean)): boolean => {
    if (typeof e === "function") {
        return e(model.value);
    }
    if (e === undefined) {
        return true;
    }
    return e;
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
