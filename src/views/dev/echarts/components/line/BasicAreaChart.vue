<template>
    <div class="BasicAreaChart">
        <base-charts :width="710" :height="500" :charts-option="ChartsOption"></base-charts>
    </div>
</template>

<script lang="ts" setup>
import getRealPx from "@/utils/tools/get-realpx/index";

let ChartsOption = reactive({});
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
        series: [
            {
                name: "全部订单",
                type: "line",
                stack: "Total",
                itemStyle: {
                    normal: {
                        color: "#FB4B3D",
                        lineStyle: {
                            color: "#FB4B3D"
                        }
                    }
                }, //线条颜色
                areaStyle: {
                    normal: {
                        color: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "#FFCCC8" // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#FFFFFF" // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    }
                }, //填充区域样式
                symbol: "circle", //设定为实心点
                symbolSize: getRealPx(8), //设定实心点的大小
                data: [120, 132, 101, 134, 90, 230, 210]
            }
        ]
    });
});
</script>

<style scoped lang="scss">
.BasicAreaChart {
    padding: 20px;
    font-size: 28px;
    color: #666666;
    background: #fff;
}
</style>
