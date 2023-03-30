<template>
    <frame-view content-class="echarts echarts-dev">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">折线图</van-divider>
        <h1>基础折线图</h1>
        <basic-line-chart></basic-line-chart>
        <h1>折线图堆叠</h1>
        <stacked-line-chart></stacked-line-chart>
        <h1>基础面积图</h1>
        <basic-area-chart></basic-area-chart>

        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">饼图</van-divider>
        <pre-chart></pre-chart>

        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">地图</van-divider>
        <map-chart></map-chart>
    </frame-view>
</template>

<script lang="ts" setup>
import BasicLineChart from "./components/line/BasicLineChart.vue";
import StackedLineChart from "./components/line/StackedLineChart.vue";
import BasicAreaChart from "./components/line/BasicAreaChart.vue";
import PreChart from "./components/pre/index.vue";
import MapChart from "./components/map/index.vue";
</script>

<style scoped lang="scss">
.echarts-dev {
    padding: 10px;
    h1 {
        font-size: 36px;
    }
}
</style>
