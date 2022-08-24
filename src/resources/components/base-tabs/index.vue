<template>
    <van-tabs
        v-model:active="bindValue"
        class="base-tabs-van-tabs"
        v-bind="$attrs"
        :color="color"
        :title-inactive-color="inActiveColor"
        :title-active-color="activeColor"
        :animated="true"
        :sticky="sticky"
        :background="background"
        @click-tab="TabsClick"
        @change="TabsChange"
    >
        <van-tab v-for="(item, index) in list" :key="index" :title="titleKey ? item[titleKey] : item.label">
            <slot :row="index" />
        </van-tab>
    </van-tabs>
</template>

<script setup lang="ts" name="BaseTabs">
const props = defineProps({
    /** tabs列表数据 */
    list: {
        type: Array,
        default: () => {
            return [];
        }
    },
    /** 标题所在key */
    titleKey: {
        type: String,
        default: ""
    },
    /**绑定的标签*/
    active: {
        type: Number,
        default: 0
    },
    sticky: {
        type: Boolean,
        default: true
    },
    /** 标签栏背景色 */
    background: {
        type: String,
        default: "#ffffff"
    },
    /**未选中标签文字颜色*/
    inActiveColor: {
        type: String,
        default: "#333333"
    },
    /**选中标签文字颜色*/
    activeColor: {
        type: String,
        default: "#3267FF"
    },
    /**标签主题色*/
    color: {
        type: String,
        default: "#3267FF"
    }
});
let bindValue = ref(props.active);

watch(
    () => props.active,
    () => {
        bindValue.value = props.active;
    }
);

const emits = defineEmits<{
    (e: "click", v1: number | string, v2: string): void;
    (e: "change", v1: number | string, v2: string): void;
}>();

/**
 * 点击标签时触发
 * @param index：索引
 * @param  value：索引值
 */
const TabsClick = (index: number | string, value: string): void => {
    emits("click", index, value);
};

/**
 * 当前激活的标签改变时触发
 * @param index：索引
 * @param  value：索引值
 */
const TabsChange = (index: number | string, value: string): void => {
    emits("change", index, value);
};
</script>

<style lang="scss" scoped>
.base-tabs-van-tabs {
    margin-bottom: 20px;
    // ::v-deep .van-tabs__nav {
    //     background: none;
    // }
    :deep(.van-tabs__line) {
        height: 4px;
        background-color: #f12f1a;
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        // background-image: url("~@/assets/images/base/tabs-active.png");
    }
    :deep(.van-tab--active) {
        font-weight: bold;
    }
}
</style>
