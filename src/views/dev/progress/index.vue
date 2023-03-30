<template>
    <frame-view>
        <div class="progress">
            <base-progress
                ref="progress"
                class="progress-bar"
                :stroke-width="670"
                :stroke-hidth="26"
                text-position="left"
                track-color="#ffffff"
                text-color="#000000"
                track-border-color="#ED0017"
                color="linear-gradient(to right, #FF8542, #FF7123,#ED0017)"
            >
                <template #other>
                    <div
                        class="other-content"
                        :style="{
                            width: getRealPx(670)
                        }"
                    >
                        进度文案居左
                    </div>
                </template>
            </base-progress>

            <base-progress
                ref="progress"
                class="progress-bar"
                :stroke-width="670"
                :stroke-hidth="26"
                text-position="center"
                track-color="#ffffff"
                text-color="#000000"
                track-border-color="#ED0017"
                color="linear-gradient(to right, #FF8542, #FF7123,#ED0017)"
            >
                <template #other>
                    <div
                        class="other-content"
                        :style="{
                            width: getRealPx(670)
                        }"
                    >
                        进度文案居中
                    </div>
                </template>
            </base-progress>

            <base-progress
                ref="progress"
                class="progress-bar"
                :stroke-width="670"
                :stroke-hidth="26"
                text-position="right"
                track-color="#ffffff"
                text-color="#000000"
                track-border-color="#ED0017"
                color="linear-gradient(to right, #FF8542, #FF7123,#ED0017)"
            >
                <template #other>
                    <div
                        class="other-content"
                        :style="{
                            width: getRealPx(670)
                        }"
                    >
                        进度文案居右
                    </div>
                </template>
            </base-progress>
        </div>
    </frame-view>
</template>

<script lang="ts" setup>
import BaseProgress from "@/resources/components/base-progress/index.vue";
import handleGetRealPx from "@/utils/tools/get-realpx/index";

const getRealPx = (px: number): string => {
    return handleGetRealPx(px) + "px";
};
</script>

<style lang="scss" scoped>
.progress {
    background: #ffffff;
    padding: 50px 0px;
    h1 {
        font-size: 36px;
        padding: 0 20px;
    }
    &-bar {
        font-size: 24px;
        .other-content {
            margin: 0 auto;
            padding: 20px 0;
        }
    }
}
</style>
