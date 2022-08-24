<template>
    <div class="pre-echarts">
        <base-charts :width="710" :height="500" :charts-option="ChartsOption"></base-charts>
    </div>
</template>

<script lang="ts" setup>
import getRealPx from "@/utils/tools/get-realpx/index";

const pieData = reactive([
    {
        value: "901",
        name: "食品"
    },
    {
        value: "503",
        name: "日用品"
    },
    {
        value: "100",
        name: "test"
    }
]);
let ChartsOption = reactive({});

onMounted(() => {
    Object.assign(ChartsOption, {
        legend: {
            orient: "vertical",
            left: "55%",
            y: "center",
            icon: "circle", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
            itemWidth: getRealPx(12), // 设置宽度
            itemHeight: getRealPx(30), // 设置高度
            itemGap: getRealPx(24), // 设置间距
            formatter: (name: string): string => {
                let data = pieData;
                let total = 0;
                let target;
                for (let i = 0, l = data.length; i < l; i++) {
                    total += Number(data[i].value);
                    if (data[i].name == name) {
                        target = data[i].value;
                    }
                }

                let arr = [];
                if (Number(target) === 0) {
                    arr = ["{a|" + name + "    0%}"]; //百分比
                } else {
                    arr = ["{a|" + name + "    " + ((Number(target) / total) * 100).toFixed(2) + "%}"]; //百分比
                }
                // let arr = ["{a|" + name + "    " + Number(target).toFixed(2) + "}"];
                return arr.join("\n");
            },
            textStyle: {
                rich: {
                    a: {
                        fontSize: getRealPx(20)
                    }
                }
            }
        },
        tooltip: {
            trigger: "item",
            position: "right",
            show: true, //默认值true，可选为：true（显示） | false（隐藏）
            padding: [5, 10], //默认值，提示内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
            textStyle: {
                //默认值，
                color: "#999999", //默认值各异，
                // decoration: "none", //默认值，
                // align: "rgba(0,0,0,0.7)", //默认值，
                // baseline: "rgba(0,0,0,0.7)", //默认值，
                // fontFamily: "Arial, Verdana, sans...", //默认值，
                fontSize: getRealPx(20), //默认值，
                // fontStyle: "normal", //默认值，样式，可选为：'normal' | 'italic' | 'oblique'
                fontWeight: "normal" //默认值，粗细，可选为：'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 |... | 900
            },

            formatter: function (param: { name: string; value: string | number; color: string }): string {
                //  <span style="margin-left:12px;">${((Number(param.value) / vm.total)* 100).toFixed(2)}%</span>
                return `
                    <span>
                        <span>${markDot(param.color)}${param.name}</span>
                        </br>
                         <span style="margin-left:12px;">${param.value}</span>
                    </div>
                    `;
            }
        },
        series: [
            {
                name: "收益总计",
                type: "pie",
                radius: ["30%", getRealPx(250 / 2)],
                center: ["20%", "50%"], //图的位置，距离左跟上的位置
                itemStyle: {
                    normal: {
                        borderColor: "#fff",
                        borderWidth: getRealPx(4),
                        color: function (params: { dataIndex: number }): string {
                            //自定义颜色
                            var colorList = ["#FF6A54", "#FFA53C", "#B780FF", "#6BD7A5"];
                            return colorList[params.dataIndex] || "#6BD7A5";
                        }
                    }
                },
                label: {
                    show: false
                },
                data: pieData
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
        "border-radius:50%;" +
        "width: 4px;" +
        "height: 4px;" +
        `background-color: ${color}` +
        '"></span>';
    return domHtml;
};
</script>

<style scoped lang="scss"></style>
