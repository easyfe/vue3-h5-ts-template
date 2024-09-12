<template>
    <van-cell class="base-select_wrapper">
        <van-field
            v-model.trim="showName"
            class="base-select"
            :placeholder="placeholder"
            v-bind="$attrs"
            readonly
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
const props = withDefaults(
    defineProps<{
        placeholder?: string;
        options: any[];
        fieldNames?: {
            name: string;
            value: string;
        };
    }>(),
    {
        placeholder: "请选择",
        options: () => [],
        fieldNames: () => {
            return { name: "name", value: "value" };
        }
    }
);

const model = defineModel<string | number>({ required: true });

let visible = ref(false);

const showName = computed(() => {
    const actions = HandleOptions(props.options as any) || [];
    const obj = actions.find((item: any) => String(item.value) === String(model.value));
    return obj ? obj.name : "";
});

const select = (val: any): void => {
    visible.value = false;
    model.value = val[props.fieldNames?.value];
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
