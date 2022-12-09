<template>
    <wx-open-subscribe :style="style" :template="template">
        <script type="text/wxtag-template">
            <style>
              .subscribe-btn {
                width:1000px;
                height:1000px;
                background:#000
              }
            </style>
            <div class="subscribe-btn"></div>
        </script>
    </wx-open-subscribe>
</template>

<script lang="ts" setup name="BaseWxSubscribe">
import envHelper from "@/utils/helper/env";

const props = defineProps({
    /** 模板ID */
    template: {
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
        opacity: envHelper.dev() ? 0.8 : 0
    };
});
</script>

<style lang="scss" scoped></style>
