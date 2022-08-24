const baseRouter = [
    {
        path: "/:pathMatch(.*)*",
        name: "404",
        meta: {
            title: "找不到页面",
            hidden: true
        },
        // eslint-disable-next-line @syyfe/validate-router
        component: (): any => import("@/views/404/index.vue")
    }
];

export default baseRouter;
