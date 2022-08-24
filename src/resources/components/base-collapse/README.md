### 组件名称：折叠面板

### 场景

### API

#### Props

| 参数             | 说明                                                   | 类型    | 默认值  |
| ---------------- | ------------------------------------------------------ | ------- | ------- |
| border           | 是否显示头部和内容区域的 分割线                        | Boolean | true    |
| initOpen         | 初始设置面板展开折叠状态 （true 为展开，false 为收起） | Boolean | false   |
| accordion        | 是否开启折叠模式                                       | Boolean | true    |
| openButtonText   | 展开时按钮文案                                         | String  | "展开"  |
| putButtonText    | 收起时按钮文案                                         | String  | "收起"  |
| round            | 是否为圆形按钮                                         | boolean | true    |
| iconColor        | 按钮 icon 字体颜色                                     | string  | #999999 |
| show-button-icon | 是否显示按钮 icon                                      | boolean | true    |

#### Events

| 事件名 | 说明           | 回调参数                                                      |
| ------ | -------------- | ------------------------------------------------------------- |
| change | 切换面板时触发 | value:boolean(true 代表面板展开状态 ，false 代表面板收起状态) |

#### Slots

| 名称             | 说明                                                             |
| ---------------- | ---------------------------------------------------------------- |
| title-content    | 自定义 title,当该插槽作为作用域插槽使用时 ，父容器访问属性 row   |
| collapse-content | 自定义显示内容,当该插槽作为作用域插槽使用时 ，父容器访问属性 row |
| switch-text      | 自定义开关,当该插槽作为作用域插槽使用时 ，父容器访问属性 row     |

#### 用法

```html
<template>
    <div class="collapse">
        <h1>折叠面板（使用默认展开、收起按钮）</h1>
        <base-collapse>
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
        </base-collapse>
        <h1>折叠面板（默认展开）</h1>
        <base-collapse :init-open="true">
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
        </base-collapse>
        <h1>折叠面板（通过插槽自定义展开、收起按钮（具名插槽））</h1>
        <base-collapse @change="collapseChange">
            <template #title-content> 标签 </template>
            <template #collapse-content> 内容 </template>
            <template #switch-text> {{ switchText }} </template>
        </base-collapse>
        <h1>折叠面板（通过插槽自定义展开、收起按钮（作用域插槽））</h1>
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
    </div>
</template>
```

```ts
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Icon } from "vant";
import BaseCollapse from "@/resources/components/base-collapse/index.vue";
@Component({
    name: "Collapse",
    components: {
        BaseCollapse,
        [Icon.name]: Icon
    }
})
export default class Collapse extends Vue {
    switchText = "展开";

    collapseChange(state: boolean): void {
        state ? (this.switchText = "收起") : (this.switchText = "展开");
    }

    mounted(): void {
        (this.$refs["collapse"] as any).toggle(false);
    }
}
</script>
```

```scss
<style lang="scss" scoped>
.collapse {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px 20px 50px 20px;
    overflow-x: auto;
    h1 {
        font-size: 36px;
    }
}
</style>
```
