import { defineAsyncComponent } from "vue";

const list: Record<string, any> = {
    action: defineAsyncComponent(() => import("./base-action/index.vue")),
    area: defineAsyncComponent(() => import("./base-area/index.vue")),
    checkbox: defineAsyncComponent(() => import("./base-checkbox/index.vue")),
    date: defineAsyncComponent(() => import("./base-date/index.vue")),
    input: defineAsyncComponent(() => import("./base-input/index.vue")),
    picker: defineAsyncComponent(() => import("./base-picker/index.vue")),
    radio: defineAsyncComponent(() => import("./base-radio/index.vue")),
    switch: defineAsyncComponent(() => import("./base-switch/index.vue")),
    uploader: defineAsyncComponent(() => import("./base-uploader/index.vue")),
    calendar: defineAsyncComponent(() => import("./base-calendar/index.vue"))
};

export default list;
