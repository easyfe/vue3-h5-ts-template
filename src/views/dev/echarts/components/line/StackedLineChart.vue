<template>
    <div class="StackedLineChart">
        <base-charts :width="710" :height="500" :charts-option="ChartsOption"></base-charts>
    </div>
</template>

<script lang="ts" setup>
import getRealPx from "@/utils/tools/get-realpx/index";

let ChartsOption = reactive({});
let startValue = ref(3); //设置X轴从某天开始
let endValue = ref(5); //一次性展示5个
/** 折线图用于提示 */
const tooltipData = reactive(["10.01", "10.02", "10.03", "10.04", "10.05", "10.06", "10.07"]);
onMounted(() => {
    Object.assign(ChartsOption, {
        legend: {
            icon: "roundRect", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
            bottom: "0",
            itemWidth: getRealPx(10), // 设置宽度
            itemHeight: getRealPx(5), // 设置高度
            itemGap: getRealPx(24), // 设置间距
            data: ["全部订单", "物流订单", "自提订单"]
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
                    result += `${markDot(el.color)}${el.seriesName}：${el.data}</br>`;
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
            },
            {
                name: "物流订单",
                type: "line",
                stack: "Total",
                itemStyle: {
                    normal: {
                        color: "#6AD7A4", //折点颜色
                        lineStyle: {
                            color: "#6AD7A4"
                        }
                    }
                },
                symbol: "circle", //设定为实心点
                symbolSize: getRealPx(8), //设定实心点的大小
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: "自提订单",
                type: "line",
                stack: "Total",
                itemStyle: {
                    normal: {
                        color: "#FB9747",
                        lineStyle: {
                            color: "#FB9747"
                        }
                    }
                },
                symbol: "circle", //设定为实心点
                symbolSize: getRealPx(8), //设定实心点的大小
                data: [150, 232, 201, 154, 190, 330, 410]
            }
        ]
    });
});
// 生成大小一样样色不同的圆点
const markDot = (color: string): string => {
    let domHtml =
        '<span style="' +
        "display: inline-block;" +
        "margin-right: 8px;" +
        "margin-bottom: 2px;" +
        "width: 7px;" +
        "height: 2px;" +
        `background-color: ${color}` +
        '"></span>';
    return domHtml;
};
</script>

<style scoped lang="scss">
.StackedLineChart {
    padding: 20px;
    font-size: 28px;
    color: #666666;
    background: #fff;
}
</style>
