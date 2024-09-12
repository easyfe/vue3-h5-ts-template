<template>
    <van-field class="base-switch" :placeholder="props.placeholder" v-bind="$attrs">
        <template #input>
            <van-switch v-model="model" v-bind="props.options" />
        </template>
    </van-field>
</template>

<script setup lang="ts" name="BaseSwitch">
const props = defineProps({
    placeholder: {
        type: String,
        default: "请输入"
    },
    options: {
        type: Object,
        default: () => {
            return {
                size: "20px"
            };
        }
    }
});

const model = defineModel<boolean>({ required: true });
</script>

<style lang="scss" scoped>
// .base-switch::after {
//     border-color: #ededed;
// }
// .van-switch--on {
//     background-color: #f12f1a;
// }
</style>
