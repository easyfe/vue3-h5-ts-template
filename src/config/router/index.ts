import { RouteConfig } from "types";

const routers: RouteConfig[] = [
    {
        path: "/",
        redirect: "/index"
    },
    {
        path: "/index",
        name: "index",
        meta: {
            title: "首页",
            icon: "dev"
        },
        component: (): any => import("@/views/index/index.vue")
    }
];

export default routers;
