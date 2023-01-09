<template>
    <van-cell class="base-select_wrapper">
        <van-field
            v-model.trim="showName"
            class="base-select"
            :placeholder="placeholder"
            v-bind="$attrs"
            readonly
            v-on="$attrs"
            @click="visible = true"
        >
        </van-field>
        <van-action-sheet
            v-model:show="visible"
            :actions="HandleOptions(props.options)"
            cancel-text="取消"
            @select="select"
        />
    </van-cell>
</template>

<script setup lang="ts" name="BaseAction">
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ""
    },
    placeholder: {
        type: String,
        default: "请选择"
    },
    /** 可选项数据源  结构{ name: "name", value: "value" }[] */
    options: {
        type: Array,
        default: () => {
            return [];
        }
    },
    /** 自定义 options 结构中的字段  */
    fieldNames: {
        type: Object,
        default: () => {
            return { name: "name", value: "value" };
        }
    }
});

let visible = ref(false);

const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

const showName = computed(() => {
    const actions = HandleOptions(props.options as any) || [];
    const obj = actions.find((item: any) => String(item.value) === String(props.modelValue));
    return obj ? obj.name : "";
});

const select = (val: any): void => {
    visible.value = false;
    emits("update:modelValue", val[props.fieldNames?.value]);
};

const HandleOptions = (
    options: { name: string; value: string | number }[]
): { name: string; value: string | number }[] => {
    let OPTIONS: { name: string; value: string | number }[] = [];
    options.find((item: any) => {
        OPTIONS.push({
            name: item[props.fieldNames.name],
            value: String(item[props.fieldNames.value])
        });
    });
    return OPTIONS;
};
</script>

<style lang="scss" scoped>
.base-select_wrapper {
    padding: 0;
    &::after {
        border-color: #ededed;
    }
}
</style>
