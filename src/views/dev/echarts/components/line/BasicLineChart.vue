<template>
    <div class="BasicLineChart">
        <base-charts :width="710" :height="500" :charts-option="ChartsOption"></base-charts>
    </div>
</template>

<script lang="ts" setup>
import getRealPx from "@/utils/tools/get-realpx/index";

let ChartsOption = reactive({});

let startValue = ref(0); //设置X轴从某天开始
let endValue = ref(5); //一次性展示5个

/** 折线图用于提示 */
const tooltipData = reactive(["10.01", "10.02", "10.03", "10.04", "10.05", "10.06", "10.07"]);

onMounted(() => {
    Object.assign(ChartsOption, {
        title: {
            // 标题
            show: true, //是否显示
            text: "数量(单)",
            textStyle: {
                color: "#333333", // 主标题文字的颜色。
                fontSize: getRealPx(20), // 字体大小
                lineHeight: "30", // 行高
                fontWeight: 500
            }
        },
        tooltip: {
            trigger: "axis",
            padding: [8, 10, 8, 10],
            axisPointer: {
                type: "line",
                lineStyle: {
                    color: "rgba(0, 0, 0, 0.65)"
                }
            },
            // 自定义提示框的内容
            formatter: (params: any): string => {
                let result = tooltipData[params[0].dataIndex] + "</br>";
                params.forEach((el: any) => {
                    if (!isNaN(el.data) && el.data !== null) {
                        result += `${el.seriesName}：${el.data}</br>`;
                    }
                });
                return result;
            }
        },
        xAxis: {
            type: "category",
            data: ["10.01", "10.02", "10.03", "10.04", "10.05", "10.06", "10.07"],
            axisLine: {
                lineStyle: {
                    color: "#999999"
                }
            }
        },
        yAxis: {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#999999"
                }
            }
        },
        dataZoom: [
            {
                type: "inside", //slider表示有滑动块的，inside表示内置的
                startValue: startValue.value, //从某个刻度轴开始
                endValue: endValue.value, //一次性展示几个
                filterMode: "none" //过滤数据
            }
        ],
        series: [
            {
                name: "全部订单",
                type: "line",
                stack: "Total",
                itemStyle: {
                    normal: {
                        color: "#707EFA",
                        lineStyle: {
                            color: "#707EFA"
                        }
                    }
                },
                symbol: "circle", //设定为实心点
                symbolSize: getRealPx(8), //设定实心点的大小
                data: [120, 132, 101, 134, 90, 230, 210]
            }
        ]
    });
});
</script>

<style scoped lang="scss">
.BasicLineChart {
    padding: 20px;
    font-size: 28px;
    color: #666666;
    background: #fff;
}
</style>
