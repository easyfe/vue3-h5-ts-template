<template>
    <frame-view class="body">
        <h6>浮点运算加法</h6>
        <p>0.08+0.7={{ 0.08 + 0.7 }}</p>
        <p>0.08+0.7={{ floatPlus }}</p>
        <h6>浮点运算减法</h6>
        <p>0.3-0.1={{ 0.3 - 0.1 }}</p>
        <p>0.3-0.1={{ floatMin }}</p>
        <h6>浮点运算乘法</h6>
        <p>0.6*3={{ 0.6 * 3 }}</p>
        <p>0.6*3={{ floatTim }}</p>
        <h6>浮点运算除法</h6>
        <p>355/113={{ 355 / 113 }}</p>
        <p>355/113={{ floatDiv }}</p>
        <h6>浮点运算取余数</h6>
        <p>1%0.9={{ 1 % 0.9 }}</p>
        <p>1%0.9={{ floatMod }}</p>
        <h6>补全小数位</h6>
        <p>{{ floatFix }}</p>
    </frame-view>
</template>

<script lang="ts" setup>
import floatHelper from "@/utils/helper/float";
const floatPlus = computed(() => {
    return floatHelper.plus(0.08, 0.7);
});

const floatMin = computed(() => {
    return floatHelper.min(0.3, 0.1);
});

const floatTim = computed(() => {
    return floatHelper.tim(0.6, 3);
});
const floatDiv = computed(() => {
    return floatHelper.div(355, 113);
});
const floatMod = computed(() => {
    return floatHelper.mod(1, 0.9);
});
const floatFix = computed(() => {
    return floatHelper.fix(0.9, 3);
});
</script>

<style lang="scss" scoped>
.body {
    display: flex;
    flex-direction: column;
    padding: 50px;
    h6 {
        margin: 15px;
    }
    p {
        margin: 15px;
        font-size: 24px;
    }
}
</style>
