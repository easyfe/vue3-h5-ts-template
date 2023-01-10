<template>
    <frame-view :theme-vars="themeVars">
        <van-form>
            <div class="test">普通div</div>
            <van-field name="rate" label="评分">
                <template #input>
                    <van-rate v-model="rate" />
                </template>
            </van-field>
            <van-field name="slider" label="滑块">
                <template #input>
                    <van-slider v-model="slider" />
                </template>
            </van-field>
            <div style="margin: 16px">
                <van-button round block type="primary" @click="change"> 全局切换主题 </van-button>
            </div>
            <div style="margin: 16px">
                <van-button round block type="success"> config-provider主题 </van-button>
            </div>
        </van-form>
    </frame-view>
</template>
<script setup lang="ts">
import theme from "@/utils/tools/theme";
const rate = ref(4);
const slider = ref(50);
const themeVars = computed(() => {
    return {
        buttonSuccessBackground: "#242424"
    };
});
const change = (): void => {
    console.log("当前主题色：", theme.getPrimary());
    const themeColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    theme.setCustom({ "--van-rate-icon-full-color": themeColor });
    theme.setPrimary(themeColor);
};
</script>

<style scoped lang="scss">
.test {
    font-size: 32px;
    padding: 20px;
    background-color: var(--van-primary-color);
}
</style>
