import root from "@/config/pinia/root";
import envHelper from "@/utils/helper/env";
import sleep from "@/utils/tools/sleep";
import { RouteConfig } from "types";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes
});

let timer = 0;
let start = 0;

/**
 * 递归处理路由
 */
const initRoute = (): void => {
    const setRoutes = (tmpRoutes: RouteConfig[]): { routeList: RouteConfig[]; keepAliveName: string[] } => {
        let cloneData: any = null;
        cloneData = [...tmpRoutes];
        const keepAliveName: string[] = [];
        for (const key in tmpRoutes) {
            if (tmpRoutes[key].meta?.keepAliveName) {
                keepAliveName.push(tmpRoutes[key].meta?.keepAliveName as string);
            }
            if (tmpRoutes[key].children?.length) {
                cloneData[key].children = setRoutes(tmpRoutes[key].children || []);
            }
        }
        return { routeList: cloneData, keepAliveName };
    };
    const res = setRoutes(routes as unknown as RouteConfig[]);
    root().routeList = res.routeList;
    root().keepaliveList = res.keepAliveName;
};

//路由前置守卫
router.beforeEach(async (to, from, next) => {
    //初始化路由
    if (!root().routeList.length) {
        initRoute();
    }
    document.title = <string>to.meta?.title || "";
    start = new Date().getTime();
    /** 资源没有加载完成的时候，给loading，为防止资源已加载完毕，加上延迟避免闪屏 */
    timer = window.setTimeout(() => {
        if (envHelper.dev()) {
            console.warn(`执行路由定时器：${timer}`);
        }
        if (timer) {
            document.getElementById("index-loading")?.setAttribute("style", "display:auto");
        }
    }, 100);
    if (from.meta?.keepAliveName) {
        let domV = "";
        if (from.meta?.scrollId) {
            domV = `#${from.meta?.scrollId}`;
        } else {
            domV = `.frame-view-content`;
        }
        const $content = document.querySelector(domV);
        const scrollTop = $content?.scrollTop || 0;
        if (from.name) {
            root().SET_SCROLL({ name: from.name.toString(), value: scrollTop });
        }
    }
    try {
        const isBack = root().isBack;
        if (isBack === null || (to.meta?.isTabbar && from.meta?.isTabbar)) {
            /** 页面初始化，tab切换的时候，不显示动画 */
            root().SET_TRANSITION("");
            root().SET_ISBACK(false);
        } else if (isBack === true) {
            /** 执行返回操作 */
            root().SET_TRANSITION("slide-left");
            root().SET_ISBACK(false);
        } else {
            /** 执行前进操作 */
            root().SET_TRANSITION("slide-right");
        }
        //延迟30毫秒，让路由动画生效
        await sleep(30);
        next();
    } catch (err) {
        next();
    }
});

router.afterEach((to) => {
    root().SET_ISBACK(false);
    if (envHelper.dev()) {
        console.warn(`路由耗时：${new Date().getTime() - start}，定时器：${timer}`);
    }
    if (timer) {
        if (envHelper.dev()) {
            console.warn(`清除路由定时器：${timer}`);
        }
        clearTimeout(timer);
        timer = 0;
    }
    document.getElementById("index-loading")?.setAttribute("style", "display:none");
    root().SET_SHOWBACK(to.meta?.isTabbar !== true && to.meta?.showBack !== false);
    if (to.meta?.keepAliveName) {
        let domV = "";
        if (to.meta?.scrollId) {
            domV = `#${to.meta?.scrollId}`;
        } else {
            domV = `.frame-view-content`;
        }
        nextTick(() => {
            const $content = document.querySelector(domV);
            if ($content && to.name) {
                $content.scrollTop = root().scrollTop[to.name.toString()] || 0;
            }
        });
    }
});

export default router;
