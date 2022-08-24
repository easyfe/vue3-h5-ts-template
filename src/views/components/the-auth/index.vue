<template>
    <div class="the-auth-wrapper" @click.stop="handleClick">
        <slot></slot>
    </div>
</template>

<script setup lang="ts" name="TheAuth">
import storage from "@/utils/tools/storage";
import { Toast } from "vant";

const props = defineProps({
    /** 登录鉴权 */
    login: {
        type: Boolean,
        default: true
    }
});

const emits = defineEmits<{
    (e: "click"): void;
}>();

const handleClick = (): void => {
    if (props.login && !handleCheckLogin()) {
        return;
    }
    emits("click");
};

/** 检查登录 */
const handleCheckLogin = (): boolean => {
    if (!storage.getToken()) {
        Toast("请登录");
        return false;
    }
    return true;
};
</script>

<style lang="scss" scoped></style>
