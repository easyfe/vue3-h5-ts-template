<template>
    <van-cell class="base-datetime_wrapper">
        <van-field
            v-model="showName"
            class="base-datetime"
            :placeholder="placeholder"
            v-bind="$attrs"
            readonly
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

const model = defineModel<string | number>({ required: true, default: "" });

let visible = ref(false);

let currentDate = ref<string[]>([]);

let showName = ref("");

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
    if (model.value) {
        const date = dateHelper.toDate(model.value);
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
        showName.value = dateHelper.formatDate(model.value, props.format);
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
    model.value = dateVal;
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
