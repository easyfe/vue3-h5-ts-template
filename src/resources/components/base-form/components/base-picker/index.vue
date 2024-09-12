<template>
    <van-cell class="base-picker_wrapper">
        <van-field
            :model-value="privateVaueText"
            right-icon="arrow"
            readonly
            placeholder="请选择"
            v-bind="$attrs"
            @click="showPicker = true"
        >
        </van-field>
        <van-popup v-model:show="showPicker" position="bottom" round>
            <van-picker
                :model-value="defaultValue"
                v-bind="props.options"
                @cancel="showPicker = false"
                @confirm="onPickerConfirm"
            />
        </van-popup>
    </van-cell>
</template>
<script lang="ts" setup name="BasePicker">
import { PickerProps } from "vant";

const props = withDefaults(
    defineProps<{
        options: Partial<PickerProps>;
    }>(),
    {}
);
const showPicker = ref(false);

const privateVaue = defineModel<string | number | string[] | number[]>();

const defaultValue = computed(() => {
    if (!privateVaue.value) {
        return [];
    }
    if (Array.isArray(privateVaue.value)) {
        return privateVaue.value;
    }
    return [privateVaue.value];
});

const textKey = computed(() => {
    return props.options.columnsFieldNames?.text || "text";
});

const valueKey = computed(() => {
    return props.options.columnsFieldNames?.value || "value";
});

const privateVaueText = computed(() => {
    const colums = props.options.columns;
    if (!Array.isArray(colums)) {
        console.error("columns is not array", colums);
        return "";
    }
    if (Array.isArray(privateVaue.value)) {
        return privateVaue.value
            .map((v1, index1) => {
                const v = colums?.[index1]?.find((v2: any) => v2[valueKey.value] === v1)?.[textKey.value];
                return v;
            })
            .join(",");
    } else {
        return colums?.find((item) => item[valueKey.value as any] === privateVaue.value)?.[textKey.value as any];
    }
});

function onPickerConfirm(e: { selectedOptions: any[] }) {
    if (e.selectedOptions.length === 1) {
        privateVaue.value = e.selectedOptions[0][valueKey.value];
    } else {
        privateVaue.value = e.selectedOptions.map((item) => item[valueKey.value]);
    }
    showPicker.value = false;
}
</script>
<style lang="scss" scoped>
.base-picker_wrapper {
    padding: 0;
    &::after {
        border-color: #ededed;
    }
}
</style>
