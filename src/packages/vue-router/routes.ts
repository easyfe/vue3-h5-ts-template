/* 组合路由并导出
 * @Author: hanxinxin
 * @Date: 2021-04-21 13:00:54
 * @Last Modified by: hanxinxin
 * @Last Modified time: 2022-07-07 17:26:25
 */
import { RouteRecordRaw } from "vue-router";
import baseRouter from "./base";
import envHelper from "@/utils/helper/env";

const modulesFiles = import.meta.globEager("/src/config/router/*.ts");
const modules: any = {};
for (const key in modulesFiles) {
    modules[key.replace("/src/config/router/", "").replace(".ts", "")] = modulesFiles[key].default;
}

const routers = [];

for (const key in modules) {
    if (key !== "dev") {
        routers.push(...modules[key]);
    }
}

if (modules?.dev && envHelper.dev()) {
    routers.push(...modules.dev);
}

routers.push(...baseRouter);

export default routers as RouteRecordRaw[];
