import { RouteConfig } from "@/types";

const routers: RouteConfig[] = [
    {
        path: "/dev",
        name: "dev",
        meta: {
            keepAlive: false,
            title: "开发者工具"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/index.vue")
    },
    {
        path: "/dev/visible",
        name: "dev-visible",
        meta: {
            title: "页面显示监听"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/visible/index.vue")
    },
    {
        path: "/dev/list",
        name: "dev-list",
        meta: {
            title: "数据流式加载"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/list/index.vue")
    },
    {
        path: "/dev/float",
        name: "dev-float",
        meta: {
            title: "浮点运算"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/float/index.vue")
    },
    {
        path: "/dev/loading",
        name: "dev-loading",
        meta: {
            title: "局部加载动画"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/loading/index.vue")
    },
    {
        path: "/dev/progress",
        name: "dev-progress",
        meta: {
            title: "进度条"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/progress/index.vue")
    },
    {
        path: "/dev/table",
        name: "dev-table",
        meta: {
            title: "表格"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/table/index.vue")
    },
    {
        path: "/dev/collapse",
        name: "dev-collapse",
        meta: {
            title: "折叠面板"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/collapse/index.vue")
    },
    {
        path: "/dev/cell",
        name: "dev-cell",
        meta: {
            title: "基础单元格"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/cell/index.vue")
    },
    {
        path: "/dev/copy",
        name: "dev-copy",
        meta: {
            title: "全局指令之复制"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/copy/index.vue")
    },
    {
        path: "/dev/form",
        name: "dev-form",
        meta: {
            title: "form表单"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/form/index.vue")
    },
    {
        path: "/dev/svg",
        name: "dev-svg",
        meta: {
            title: "svg"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/svg/index.vue")
    },
    {
        path: "/dev/rich-text",
        name: "dev-rich-text",
        meta: {
            title: "rich-text"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/rich-text/index.vue")
    },
    {
        path: "/dev/geolocation",
        name: "dev-geolocation",
        meta: {
            title: "geolocation"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/geolocation/index.vue")
    },
    {
        path: "/dev/echarts",
        name: "dev-echarts",
        meta: {
            title: "Echarts图表"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/echarts/index.vue")
    },
    {
        path: "/dev/drag",
        name: "dev-drag",
        meta: {
            title: "drag拖拽"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/drag/index.vue")
    },
    {
        path: "/dev/format-money",
        name: "dev-format-money",
        meta: {
            title: "金额格式化"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/format-money/index.vue")
    },
    {
        path: "/dev/tabs",
        name: "dev-tabs",
        meta: {
            title: "标签页"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/tabs/index.vue")
    },
    {
        path: "/dev/card",
        name: "dev-card",
        meta: {
            title: "商品卡片"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/card/index.vue")
    },
    {
        path: "/dev/scan",
        name: "dev-scan",
        meta: {
            title: "原生扫码"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/scan/index.vue")
    },
    {
        path: "/dev/theme",
        name: "dev-theme",
        meta: {
            title: "原生扫码"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/theme/index.vue")
    },
    {
        path: "/dev/skeleton",
        name: "dev-skeleton",
        meta: {
            title: "骨架屏"
        },
        component: (): any => import(/* webpackChunkName: "modules/dev"*/ "@/views/dev/skeleton/index.vue")
    }
];

export default routers;
