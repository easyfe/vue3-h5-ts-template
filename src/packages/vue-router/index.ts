import root from "@/config/pinia/root";
import env from "@/utils/tools/env";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes
});

let timer = 0;
let start = 0;

//路由前置守卫
router.beforeEach((to, from, next) => {
    document.title = <string>to.meta?.title || "";
    start = new Date().getTime();
    /** 资源没有加载完成的时候，给loading，为防止资源已加载完毕，加上延迟避免闪屏 */
    timer = window.setTimeout(() => {
        if (env.dev()) {
            console.warn(`执行路由定时器：${timer}`);
        }
        if (timer) {
            document.getElementById("index-loading")?.setAttribute("style", "display:auto");
        }
    }, 100);
    if (from.meta?.keepAlive) {
        const $content = document.querySelector(".frame-view-content");
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
        setTimeout(() => {
            next();
        }, 0 * 1000);
    } catch (err) {
        next();
    }
});

router.afterEach((to) => {
    root().SET_ISBACK(false);
    if (env.dev()) {
        console.warn(`路由耗时：${new Date().getTime() - start}，定时器：${timer}`);
    }
    if (timer) {
        if (env.dev()) {
            console.warn(`清除路由定时器：${timer}`);
        }
        clearTimeout(timer);
        timer = 0;
    }
    document.getElementById("index-loading")?.setAttribute("style", "display:none");
    root().SET_SHOWBACK(to.meta?.isTabbar !== true && to.meta?.showBack !== false);
    if (to.meta?.keepAlive) {
        const $content = document.querySelector(".frame-view-content");
        if ($content && to.name) {
            $content.scrollTop = root().scrollTop[to.name.toString()] || 0;
        }
    }
});

export default router;
