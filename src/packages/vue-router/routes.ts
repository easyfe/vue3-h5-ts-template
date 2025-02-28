/* 组合路由并导出
 * @Author: hanxinxin
 * @Date: 2021-04-21 13:00:54
 * @Last Modified by: hanxinxin
 * @Last Modified time: 2024-07-09 10:11:35
 */
import { RouteRecordRaw } from "vue-router";
import baseRouter from "./base";
import envHelper from "@/utils/helper/env";

const modulesFiles: Record<string, any> = import.meta.globEager("/src/config/router/*.ts");
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

if (modules?.dev && (envHelper.dev() || envHelper.test())) {
    routers.push(...modules.dev);
}

routers.push(...baseRouter);

export default routers as RouteRecordRaw[];
