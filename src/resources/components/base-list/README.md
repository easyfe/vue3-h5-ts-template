## List组件

实现上拉加载、下拉刷新、出错点击重试的业务逻辑，外部只需传入item样式即可。

### 场景

用于所有瀑布流信息的展示。

### 用法

```javascript
<template>
    <base-list :custom-style="listWrapperStyle" :req="getList">
        <template #item="scope">
            <div class="title">
                <span>title:{{ scope.row.username }}</span>
            </div>
        </template>
        <template #default>
            <span>slot插槽</span>
        </template>
    </base-list>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import BaseList from "@/resources/components/base-list/index.vue";
import getRealPx from "@/utils/tools/get-realpx/index";
import { listlevel } from "@/config/apis/dev";
import { BaseListReq } from "/#/base";
@Component({
    name: "List",
    components: {
        BaseList
    }
})
export default class List extends Vue {
    get listWrapperStyle(): any {
        return {
            padding: `${getRealPx(20)}px`
        };
    }
    getList: BaseListReq = {
        fn: listlevel,
        params: {
            tt: 1,
            size: 2
        }
    };
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 20px;
}
.title {
    width: 500px;
    height: 200px;
    background: "#1e1e1e";
    font-size: 24px;
}
</style>

```

### API

#### Props

| 参数         | 说明                                 | 类型           | 默认值 | 必须 |
| :----------- | ------------------------------------ | -------------- | ------ | ---- |
| req          | 构造请求，必须传入fn，可选传入params | object         | -      | 是   |
| custom-style | 自定义wrapper样式，传入style规范     | object         | -      | 否   |
| pull         | 是否允许下拉                         | boolean        | true   | 否   |
| active       | 焦点key，防止组件重复请求            | string\|number | -      | 否   |
| row-key      | 数据key，定位列表存在的key           | string         | -      | 否   |

#### Events

| 事件名 | 说明                   | 回调参数 |
| ------ | ---------------------- | -------- |
| export | 返回组件内每次请求结果 | object   |