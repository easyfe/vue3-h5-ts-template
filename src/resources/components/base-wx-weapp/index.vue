<template>
    <wx-open-launch-weapp :username="appid" :path="path" :style="style">
        <script type="text/wxtag-template">
            <style>
                .launch-btn {
                    width:1000px;
                    height:1000px;
                    background:#000
              }
            </style>
            <div class="launch-btn"></div>
        </script>
    </wx-open-launch-weapp>
</template>

<script lang="ts" name="BaseWxWeapp" setup>
import env from "@/utils/tools/env";

const props = defineProps({
    /** 小程序跳转路径，例：pages/home/index */
    path: {
        type: String,
        default: "",
        required: true
    },
    /** 小程序AppID */
    appid: {
        type: String,
        default: "",
        required: true
    },
    /** 层级 */
    zIndex: {
        type: Number,
        default: 2
    }
});
const style = computed(() => {
    return {
        "z-index": props.zIndex || 2,
        position: "absolute",
        top: 0,
        left: 0,
        opacity: env.dev() ? 0.8 : 0
    };
});
</script>

<style lang="scss" scoped></style>
