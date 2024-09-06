import { createApp } from "vue";
import { createPinia } from "pinia";
import app from "./app.vue";
import router from "@/packages/vue-router/index";
/***************** 样式相关 ***************/
import "virtual:svg-icons-register";
//引入全局样式
import "@/styles/index.scss";
//vant组件样式注册
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";
import "@vant/touch-emulator";

import i18n from "./locales";

/***************** vue相关 ***************/
//导入布局相关初始化处理
import "@/packages/init/index";
//引入全局自定义指令
import directive from "@/resources/directive";
import VueDOMPurifyHTML from "vue-dompurify-html";
//vant组件相关
import { Lazyload } from "vant";

const App = createApp(app);
App.use(createPinia());
App.use(router);
await router.isReady();
history.replaceState({ ...history.state, isFirstPage: true }, "");
App.use(VueDOMPurifyHTML);
App.use(Lazyload);
App.use(i18n);
Object.keys(directive).forEach((key) => {
    App.directive(key, directive[key]);
});
App.mount("#app");
