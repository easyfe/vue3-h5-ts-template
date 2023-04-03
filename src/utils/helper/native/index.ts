import nativeBridge from "@/utils/tools/native-bridge";
import uaHelper from "../ua";
import wx from "weixin-js-sdk";
import QS from "@/utils/tools/qs";
// import { translateGeoLocation } from "@/config/apis/common";

import back from "@/utils/tools/back";
const nativeHelper = {
    back() {
        if (uaHelper.inApp) {
            // if (history.state.isFirstPage) {
            //     //执行退出webview操作
            // }
            nativeBridge.handleMethods("goBack", "");
            return;
        }
        if (uaHelper.isWemp) {
            wx.miniProgram.navigateBack();
            return;
        }
        back();
    },
    jump(data: { page: string; query?: Record<string, any>; type?: "replace" | "push" }) {
        if (uaHelper.inApp) {
            nativeBridge.handleMethods("jump", {
                page: data.page,
                ...data.query
            });
        }
        if (uaHelper.isWemp) {
            const urlParams = QS.stringify(data.query ?? {});
            let fn = wx.miniProgram.navigateTo;
            if (data.type === "replace") {
                fn = wx.miniProgram.redirectTo;
            }
            fn({
                url: `${data.page}?${urlParams}`
            });
        }
    },
    getToken(): Promise<string> {
        return new Promise((resolve) => {
            if (uaHelper.inApp) {
                nativeBridge.handleMethods("getToken", (token) => {
                    resolve(token);
                });
            }
            if (uaHelper.isWemp) {
                const token = QS.getUrlkey("access_token");
                resolve(token);
            }
        });
    },
    getAppSafeTop(): Promise<number> {
        return new Promise((resolve) => {
            if (uaHelper.inApp) {
                nativeBridge.handleMethods("getSafeAreaTop", (res) => {
                    resolve(res);
                });
            } else {
                resolve(0);
            }
        });
    },
    newWebView(url: string) {
        nativeBridge.handleMethods("newWebView", { url });
    },
    uploadImage(params?: { limit?: number; clip?: boolean; type?: string }): Promise<string> {
        return new Promise((resolve, reject) => {
            const newParams = {
                limit: params?.limit ?? 1,
                clip: params?.clip ?? false,
                type: params?.type ?? ""
            };
            nativeBridge.handleMethods("uploadImage", newParams, (data) => {
                if (!data) {
                    reject("上传失败");
                    return;
                }
                resolve(data);
            });
        });
    },
    applyLocationPermission(): Promise<string> {
        return new Promise((resolve) => {
            if (uaHelper.inApp) {
                nativeBridge.handleMethods("applyLocationPermission", {}, (data) => {
                    console.log("=====applyLocationPermission====", data);
                    if (data) {
                        resolve(data);
                        // if (uaHelper.isAndroidApp) {
                        //     translateGeoLocation({ locations: data, type: 1 }).then((res) => {
                        //         if (res.status === 0 && res.locations.length) {
                        //             resolve(`${res.locations[0].lat},${res.locations[0].lng}`);
                        //         } else {
                        //             resolve("");
                        //         }
                        //     });
                        // } else {
                        //     resolve("");
                        // }
                    } else {
                        resolve("");
                    }
                });
            } else {
                resolve("");
            }
        });
    }
};
export default nativeHelper;
