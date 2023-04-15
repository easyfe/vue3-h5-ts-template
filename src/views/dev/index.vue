<template>
    <frame-view>
        <div id="KEEP_DEV" class="content">
            <div class="demo-nav">
                <h1>开发者功能预览</h1>
            </div>
            <div class="demo-home-nav">
                <template v-for="(item, index) in list" :key="index">
                    <div class="demo-home-nav__title">{{ item.title }}</div>
                    <div class="demo-home-nav__group">
                        <template v-for="detail in item.data" :key="detail.route">
                            <router-link :to="detail.route" class="demo-home-nav__block">{{
                                detail.name
                            }}</router-link></template
                        >
                    </div>
                </template>
            </div>
        </div>
    </frame-view>
</template>
<script lang="ts" setup name="KEEP_DEV">
const list = reactive([
    {
        title: "全局样式",
        data: [
            {
                route: "/dev/theme",
                name: "主题切换"
            }
        ]
    },
    {
        title: "基础组件",
        data: [
            {
                route: "/dev/masonry",
                name: "瀑布流"
            },
            {
                route: "/dev/visible",
                name: "页面显示隐藏"
            },
            {
                route: "/dev/list",
                name: "流式列表"
            },
            {
                route: "/dev/loading",
                name: "局部加载动画"
            },
            {
                route: "/dev/progress",
                name: "进度条"
            },
            {
                route: "/dev/table",
                name: "表格"
            },
            {
                route: "/dev/collapse",
                name: "折叠面板"
            },
            {
                route: "/dev/cell",
                name: "基础单元格"
            },
            {
                route: "/dev/rich-text",
                name: "富文本渲染"
            },
            {
                route: "/dev/form",
                name: "表单"
            },
            {
                route: "/dev/svg",
                name: "svg图标"
            },
            {
                route: "/dev/echarts",
                name: "Echarts图表"
            },
            {
                route: "/dev/drag",
                name: "Drag拖动"
            },
            {
                route: "/dev/tabs",
                name: "标签页"
            },
            {
                route: "/dev/skeleton",
                name: "骨架屏"
            }
        ]
    },
    {
        title: "业务组件",
        data: [
            {
                route: "/dev/format-money",
                name: "金额格式化"
            },
            {
                route: "/dev/card",
                name: "商品卡片"
            }
        ]
    },
    {
        title: "工具类",
        data: [
            {
                route: "/dev/float",
                name: "浮点运算"
            },
            {
                route: "/dev/geolocation",
                name: "原生地理位置"
            },
            {
                route: "/dev/scan",
                name: "原生扫码"
            }
        ]
    },
    {
        title: "全局指令",
        data: [
            {
                route: "/dev/copy",
                name: "复制"
            }
        ]
    }
]);
onActivated(() => {
    console.log("========onActivated============");
});
</script>
<style lang="scss" scoped>
.content {
    height: 100%;
    background: #fff;
    padding: 92px 40px;
    overflow: auto;
    .demo-nav {
        font-size: 32px;
        font-weight: normal;
        margin-bottom: 80px;
    }
    .demo-home-nav {
        &__title {
            color: rgba(69, 90, 100, 0.6);
            font-size: 28px;
            margin-bottom: 28px;
        }
        &__group {
            .demo-home-nav__block {
                position: relative;
                display: flex;
                margin: 0 0 24px;
                padding-left: 40px;
                color: #323233;
                font-weight: 600;
                font-size: 24px;
                line-height: 80px;
                background: #f7f8fa;
                border-radius: 200px;
                transition: #f7f8fa 0.3s;
            }
        }
    }
}
</style>
