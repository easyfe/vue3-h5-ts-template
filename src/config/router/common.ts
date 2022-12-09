import { RouteConfig } from "types";

const routers: RouteConfig[] = [
    {
        path: "/common/map",
        name: "common-map",
        meta: {
            title: "地图"
        },
        component: (): any => import("@/views/common/map/index.vue")
    }
];

export default routers;
