<template>
    <div class="map">
        <base-charts :width="710" :height="500" :charts-option="ChartsOption" charts-type="map"></base-charts>
    </div>
</template>

<script lang="ts" setup>
import getRealPx from "@/utils/tools/get-realpx/index";

const data = reactive([
    {
        name: "陕西省", //注意这个name 必须和 chinaJSON 的省份name对应，参照 /packages/echarts/map/README.md 说明文件
        itemStyle: {
            areaColor: "lightskyblue"
        }
    },
    {
        name: "新疆维吾尔自治区",
        value: 100
    },
    {
        name: "黑龙江省",
        value: 10
    }
]);

let ChartsOption = reactive({});

onMounted(() => {
    Object.assign(ChartsOption, {
        tooltip: {
            trigger: "item",
            position: "right",
            confine: true,
            show: true,
            borderWidth: "0",
            padding: [`${getRealPx(14)}`, `${getRealPx(20)}`, `${getRealPx(18)}`, `${getRealPx(16)}`], // 提示框浮层内边距，
            textStyle: {
                fontSize: "16",
                color: "#000000"
            },
            formatter: (params: any): any => {
                return `
                    <div style="line-height:18px;">
                        <div style="font-size:${getRealPx(18)}px;color:#666666;">
                            ${params.name}
                        </div>
                        <div style="font-size:${getRealPx(18)}px;color:#666666;">
                            <span style="margin-right:${getRealPx(16)}px;">
                                数量
                            </span>
                            <span>
                               ${params.value ? params.value : 0}
                            </span>
                        </div>
                    </div>
                    `;
            }
        },
        //视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素。视觉元素可以是：symbol: 图元的图形类别。symbolSize: 图元的大小。color: 图元的颜色。
        visualMap: {
            type: "piecewise",
            show: false, //是否显示 visualMap-continuous 组件。如果设置为 false，不会显示，但是数据映射的功能还存在
            min: 10, //指定 visualMapContinuous 组件的允许的最小值
            max: 100, //指定 visualMapContinuous 组件的允许的最大值
            inRange: {
                //定义 在选中范围中 的视觉元素
                color: ["#3B60ED"]
            }
        },
        series: [
            {
                type: "map",
                map: "china",
                aspectScale: 0.75,
                roam: false, // 可以缩放和平移
                zoom: 1.2,
                label: {
                    normal: {
                        show: false, //显示省份标签
                        textStyle: {
                            //省份标签字体UI设置
                            fontSize: "0"
                        }
                    }
                },
                itemStyle: {
                    // 图形上的地图区域
                    normal: {
                        areaColor: "#F6F6F6",
                        borderColor: "#DCDCDC",
                        borderWidth: 1
                    },
                    emphasis: {
                        //鼠标移入时高亮当前区域
                        areaColor: "#0A38E8"
                    }
                },
                select: {
                    //设置地图点击之后的眼神
                    itemStyle: {
                        color: "#0A38E8"
                    }
                },
                data
            }
        ]
    });
});
</script>

<style scoped lang="scss">
.map {
    padding: 20px;
    font-size: 28px;
    color: #666666;
    line-height: 40px;
    background: #fff;
    .echarts-map {
        width: 100%;
        height: 800px;
        #map-div {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
