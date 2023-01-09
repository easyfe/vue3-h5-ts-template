<template>
    <van-cell class="base-datetime_wrapper">
        <van-field
            v-model="showName"
            class="base-datetime"
            :placeholder="placeholder"
            v-bind="$attrs"
            readonly
            v-on="$attrs"
            @click="visible = true"
        >
        </van-field>
        <van-popup v-model:show="visible" round position="bottom">
            <van-date-picker v-model="currentDate" v-bind="options" @confirm="onConfirm" @cancel="visible = false" />
        </van-popup>
    </van-cell>
</template>

<script setup lang="ts" name="BaseDate">
import dateHelper from "@/utils/helper/date/index";

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ""
    },
    placeholder: {
        type: String,
        default: "请选择"
    },
    format: {
        type: String,
        default: "YYYY-MM"
    },
    sourceFormat: {
        type: String,
        default: ""
    },
    options: {
        type: Object,
        default: () => {
            return {
                type: "date"
            };
        }
    }
});

let visible = ref(false);

let currentDate = ref<string[]>([]);

let showName = ref("");

const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

const fixZero = (value: number) => {
    if (!value) {
        return "";
    }
    if (value.toString().length === 1) {
        return `0${value}`;
    }
    return value.toString();
};

onMounted(() => {
    if (props.modelValue) {
        const date = dateHelper.toDate(props.modelValue);
        const tmpDate: string[] = [];
        props.options?.columnsType?.forEach((item: string) => {
            if (item === "year") {
                tmpDate.push(fixZero(date.getFullYear()));
            }
            if (item === "month") {
                tmpDate.push(fixZero(date.getMonth() + 1));
            }
            if (item === "day") {
                tmpDate.push(fixZero(date.getDate()));
            }
        });
        currentDate.value = tmpDate;
        showName.value = dateHelper.formatDate(props.modelValue, props.format);
    }
});

const onConfirm = (val: { selectedValues: string[] }): void => {
    visible.value = false;
    const dateVal = dateHelper.toUnix(
        val.selectedValues.toString(),
        props.options?.columnsType.toString().replace("year", "YYYY").replace("month", "MM").replace("day", "DD")
    );
    currentDate.value = val.selectedValues;
    showName.value = dateHelper.formatDate(dateVal, props.format);
    emits("update:modelValue", dateVal);
};
</script>

<style lang="scss" scoped>
.base-datetime_wrapper {
    padding: 0;
    &::after {
        border-color: #ededed;
    }
}
</style>
