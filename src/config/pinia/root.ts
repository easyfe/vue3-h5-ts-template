import { RouteConfig } from "types";
import { defineStore } from "pinia";

export default defineStore({
    id: "root",
    state: () => ({
        //路由数组
        routeList: <RouteConfig[]>[],
        // 缓存页面name列表
        keepaliveList: <string[]>[],
        // 路由是否后退
        isBack: <null | boolean>null,
        // 微信sdk可用状态
        wxSdkStatus: false,
        // 微信开放标签可用状态
        wxOpenTag: false,
        // 滚动条位置
        scrollTop: <Record<string, number>>{},
        // 是否隐藏返回按钮
        showBack: false,
        // 滑动动画
        transitionName: "",
        //顶部安全区高度
        safeAreaTop: <null | number>null
    }),
    actions: {
        SET_WXSDK(res: boolean): void {
            this.wxSdkStatus = res;
        },
        SET_WXOPENTAG(res: boolean): void {
            this.wxOpenTag = res;
        },
        SET_ISBACK(res: boolean): void {
            this.isBack = res;
        },
        SET_SCROLL(res: { name: string; value: number }): void {
            this.scrollTop[res.name] = res.value;
        },
        SET_SHOWBACK(res: boolean): void {
            this.showBack = res;
        },
        SET_TRANSITION(res: string): void {
            this.transitionName = res;
        }
    }
});
