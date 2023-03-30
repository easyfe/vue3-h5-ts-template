<template>
    <frame-view content-class="collapse">
        <h1>折叠面板（使用默认展开、收起按钮）</h1>
        <base-collapse>
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
        </base-collapse>
        <h1>折叠面板（默认展开）</h1>
        <base-collapse init-open>
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
        </base-collapse>
        <h1>折叠面板（自定义按钮文本）</h1>
        <base-collapse open-button-text="展开信息" put-button-text="收起信息">
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
        </base-collapse>
        <h1>折叠面板（不显示按钮icon）</h1>
        <base-collapse :show-button-icon="false">
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
        </base-collapse>
        <h1>折叠面板（设置icon颜色）</h1>
        <base-collapse icon-color="red">
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
        </base-collapse>
        <h1>折叠面板（折叠开关为文本按钮）</h1>
        <base-collapse :round="false">
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
        </base-collapse>
        <h1>折叠面板（通过插槽自定义操作按钮）</h1>
        <p>具名插槽，适用于页面只存在一个折叠面板时自定义操作按钮的场景</p>
        <base-collapse @change="collapseChange">
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
            <template #switch-text> {{ switchText }} </template>
        </base-collapse>
        <h1>折叠面板（通过插槽自定义操作按钮）</h1>
        <p>作用域插槽，适用于页面循环多个折叠面板自定义操作按钮的场景</p>
        <base-collapse>
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
            <template #switch-text="{ row }">
                <span v-show="row && row.isOpen">
                    <span>收起信息</span>
                    <van-icon name="arrow-up" />
                </span>
                <span v-show="row && !row.isOpen">
                    <span>展开信息</span>
                    <van-icon name="arrow-down" />
                </span>
            </template>
        </base-collapse>
        <h1>折叠面板（通过ref设置面板的状态）</h1>
        <base-collapse ref="collapse">
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
        </base-collapse>
        <h1>折叠面板（不开启折叠模式）</h1>
        <base-collapse :accordion="false">
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
        </base-collapse>
    </frame-view>
</template>

<script lang="ts" setup>
import BaseCollapse from "@/resources/components/base-collapse/index.vue";

let switchText = ref("展开");

const collapse = ref(null);

const collapseChange = (state: boolean): void => {
    state ? (switchText.value = "收起") : (switchText.value = "展开");
};
onMounted(() => {
    (collapse.value as any).toggle(true);
});
</script>

<style lang="scss" scoped>
.collapse {
    width: 100%;
    height: 100%;
    padding: 10px 20px 50px 20px;
    overflow-x: auto;
    h1 {
        font-size: 36px;
    }
    p {
        font-size: 20px;
        color: red;
        padding: 10px 0;
    }
}
</style>
