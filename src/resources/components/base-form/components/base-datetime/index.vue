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
            <van-datetime-picker
                v-model="currentDate"
                v-bind="options"
                @confirm="onConfirm"
                @cancel="visible = false"
            />
        </van-popup>
    </van-cell>
</template>

<script setup lang="ts" name="BaseDatetime">
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

let currentDate = ref(new Date());

let showName = ref("");

const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

onMounted(() => {
    if (props.modelValue) {
        currentDate.value = dateHelper.toDate(props.modelValue);
        showName.value = dateHelper.formatDate(props.modelValue, props.format);
    }
});

const onConfirm = (val: any): void => {
    visible.value = false;
    currentDate.value = val;
    showName.value = dateHelper.formatDate(val, props.format);
    emits("update:modelValue", dateHelper.toUnix(val));
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
