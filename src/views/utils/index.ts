import router, { initRoute } from "@/packages/vue-router";
import storage from "@/utils/tools/storage";
import global from "@/config/pinia/global";

/**
 * 全局初始化
 * @returns
 */
export function initGlobal() {
    return new Promise(async (resolve, reject) => {
        try {
            if (!storage.getToken()) {
                reject();
                router.replace({
                    path: "/login",
                    query: {
                        redirect: router.currentRoute.value.fullPath
                    }
                });
                return;
            }
            // const userInfo = await getUserInfo();
            // initDeptList();
            // global().userInfo = userInfo;
            initRoute();
            global().initSuccess = true;
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
}

import * as tool from "./tool";
export { tool };
