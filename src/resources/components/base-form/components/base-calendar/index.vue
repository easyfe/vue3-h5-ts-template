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
        <van-calendar v-model:show="showPicker" v-bind="props.options" @confirm="onConfirm" />
    </van-cell>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import { CalendarProps } from "vant";

const props = withDefaults(
    defineProps<{
        options: Partial<CalendarProps>;
        format?: (v: any) => string;
    }>(),
    {
        format: (e: any) => {
            return dayjs(e).format("YYYY-MM-DD");
        }
    }
);
const showPicker = ref(false);

const model = defineModel<string | number | string[] | number[]>();

const privateVaueText = computed(() => {
    if (!model.value) {
        return "";
    }
    return props.format?.(model.value);
});

function onConfirm(e: Date | Date[]) {
    if (Array.isArray(e)) {
        model.value = e.map((item) => item.toLocaleDateString());
    } else {
        model.value = e.toLocaleDateString();
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
