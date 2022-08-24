### 组件名称：表格组件

### 场景

### API

#### Props

| 参数           | 说明                                                          | 类型           | 默认值     |
| -------------- | ------------------------------------------------------------- | -------------- | ---------- |
| tableData      | 显示的数据                                                    | Array          | []         |
| columns        | 列数、行数据的 Key、属性设置                                  | Array          | []         |
| border         | 是否带有纵向边框                                              | Boolean        | false      |
| height         | Table 高度                                                    | Number, String | —          |
| theadRowHeight | 表头高度 默认单位为 px                                        | Number, String | —          |
| tbodyRowHeight | 表体行高度 默认单位为 px                                      | Number, String | —          |
| width          | Table 宽度 默认单位为 px                                      | Number, String | 父容器宽度 |
| emptyText      | 空数据时显示的文本内容，也可以通过 slot="empty" 设置          | String         | 暂无数据   |
| imageSize      | 空数据时显示的图片大小，默认单位为 px                         | Number, String | —          |
| image          | 表头自定义图标，image 为传入的插槽名称,通过 :slot="mage" 设置 | String         | —          |
| fit            | 列的宽度是否自撑开                                            | Boolean        | true       |
| showRowNum     | 只显示 showRowNum 行，剩下内容不显示 ，默认不隐藏             | Number, String | Infinity   |
| borderColor    | Table 边框颜色                                                | String         | #e8e8e8    |
| rowKey         | 列取值 key                                                    | String         | undefined  |

#### Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |

#### Slots

| 名称   | 说明                                                    |
| ------ | ------------------------------------------------------- |
| 自定义 | 取 columns 中的 item 里面 image 字段，用于设置标题 icon |
| empty  | 自定义无数据时显示内容                                  |

#### 用法

```html
<template>
    <div
        id="BaseTable"
        v-bind="$attrs"
        class="base-table"
        :style="{
            width: getRealPx(width)
        }"
    >
        <table class="h5-hairline--surround">
            <thead
                :style="{
                    tableLayout: fit ? 'fixed' : 'auto'
                }"
            >
                <tr
                    :style="{
                        height: getRealPx(theadRowHeight)
                    }"
                >
                    <th
                        v-for="(item, index) in columns"
                        :key="index"
                        :class="[{ 'h5-hairline--bottom--left': border }]"
                        :style="{
                            color: item.thColor,
                            width: item.width ? getRealPx(item.width) : ''
                        }"
                    >
                        <div class="text-box">
                            <!-- 表头组件支持传icon -->
                            <template v-if="item.image">
                                <slot :name="item.image"></slot>
                            </template>
                            <!-- 表头描述文本 -->
                            <span>{{ item.label }}</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody
                :style="{
                    maxHeight: getRealPx(height)
                }"
            >
                <!-- 有数据 -->
                <template v-if="tableData.length">
                    <tr
                        v-for="(ele, dlx) in tableData"
                        v-show="dlx < showRowNum"
                        :key="dlx"
                        :style="{
                            tableLayout: fit ? 'fixed' : 'auto',
                            height: getRealPx(tbodyRowHeight)
                        }"
                    >
                        <td
                            v-for="(item, index) in columns"
                            :key="index"
                            :class="[{ 'h5-hairline--bottom--left': border }]"
                            :style="{
                                color: item.tdColor,
                                width: item.width ? getRealPx(item.width) : ''
                            }"
                        >
                            {{ ele[item.rowKey] }}
                        </td>
                    </tr>
                </template>
                <!-- 无数据 -->
                <template v-else>
                    <tr>
                        <td>
                            <!-- 使用插槽 -->
                            <template v-if="$slots.empty">
                                <slot name="empty"></slot>
                            </template>
                            <template v-else>
                                <van-empty
                                    :description="emptyText"
                                    :image-size="getRealPx(imageSize)"
                                    style="position: static"
                                />
                            </template>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
```

```ts
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import getRealPx from "@/utils/tools/get-realpx/index";
@Component({
    name: "BaseTable"
})
export default class BaseTable extends Vue {
    /**
     * @param {array} 显示的数据
    */
    @Prop({
        type: Array,
        required: true,
        default: [],
        validator(value) {
            if (Object.prototype.toString.call(value) === "[object Array]") {
                return true;
            }
            return false;
        }
    })
    tableData?: [];

    /**
     * @param {array}  列数以及对应的取值字段
     * @param {string} item.label  header
     * @param {string} item.rowKey  列数据的 Key
     * @param {string} item.thColor  th对应列字体颜色
     * @param {string} item.tdColor  td对应列字体颜色
     * @param {string} item.width      对应列的宽度
    */
    @Prop({
        type: Array,
        required: true,
        default: [],
        validator(value) {
            if (Object.prototype.toString.call(value) === "[object Array]") {
                return true;
            }
            return false;
        }
    })
    columns?: [];

    /**
     * @param {boolean}  是否带有纵向边框
    */
    @Prop({
        type: [Boolean],
        default: false
    })
    border?: boolean;

    /**
     * @param {number|string}  Table高度
    */
    @Prop({
        type: [Number, String]
    })
    height?: [number, string];

    /**
     * @param {number|string}  表头高度 默认单位为px
    */
    @Prop({
        type: [Number, String],
        default: "auto"
    })
    theadRowHeight?: [number, string];

    /**
     * @param {number|string}  表体行高度 默认单位为px
    */
    @Prop({
        type: [Number, String],
        default: "auto"
    })
    tbodyRowHeight?: [number, string];

    /**
     * @param {number|string}  Table宽度 默认单位为px
    */
    @Prop({
        type: [Number, String]
    })
    width?: [number, string];

    /**
     * @param {string}  空数据时显示的文本内容，也可以通过 slot="empty" 设置
    */
    @Prop({
        type: [String],
        default: "暂无数据"
    })
    emptyText?: string;

    /**
     * @param {number | string}  空数据时显示的图片大小，默认单位为px
    */
    @Prop({
        type: [Number, String]
    })
    imageSize?: [number, string];

    /**
     * @param {string}  表头自定义图标，image为传入的插槽名称,通过 :slot="mage" 设置
    */
    @Prop({
        type: String
    })
    image?: string;

    /**
     * @param {boolean}  列的宽度是否自撑开
    */
    @Prop({
        type: [Boolean],
        default: true
    })
    fit?: boolean;

    /**
     * @param {number | string}  只显示 showRowNum 行，剩下内容不显示 ，默认不隐藏
    */
    @Prop({
        type: [Number, String],
        default: Infinity
    })
    showRowNum?: [number, string];

    /**
     * 获取真实像素大小
     * @param px 传入设计稿标注大小(iphone6为标准)，如果是vant组件，请按照设计稿除以2，因为vant的根字体大小为37.5
     * @returns
    */
    getRealPx(px: number | string): string {
        if (px === "auto") return "auto";
        return getRealPx(+px) + "px";
    }
}
</script>
```

```scss
<style lang="scss" scoped>
$bgColor: #ffffff;
$thBgColor: #f8f8f8;
$borderColor: #e8e8e8;
$thColor: #3b3b3b;
$tdColor: #999999;

.base-table {
    width: 100%;
    overflow-x: auto;
    margin: 0 auto;
    font-size: 24px;

    /**边框 START**/
    [class*="h5-hairline"]::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border: 0 solid $borderColor;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
    }
    .h5-hairline--top,
    .h5-hairline--bottom,
    .h5-hairline--left,
    .h5-hairline--right,
    .h5-hairline--bottom--left,
    .h5-hairline--surround {
        position: relative;
    }
    //上边框
    .h5-hairline--top::after {
        border-top-width: 1px;
    }
    // 左边框
    .h5-hairline--left::after {
        border-left-width: 1px;
    }
    // 右边框
    .h5-hairline--right::after {
        border-right-width: 1px;
    }
    // 下边框
    .h5-hairline--bottom::after {
        border-bottom-width: 1px;
    }
    //下、左边框
    .h5-hairline--bottom--left::after {
        border-width: 0 0 1px 1px;
    }
    //全边框
    .h5-hairline--surround::after {
        border-width: 1px;
    }
    /**边框 START**/

    table {
        text-align: center;
        border-radius: 3px;
        background-color: $bgColor;
        border-collapse: collapse;
    }

    th {
        background: $thBgColor;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: $thColor;
        .text-box {
            display: inline-flex;
            align-items: center;
        }
    }
    tr {
        &:last-child {
            td {
                border-bottom: none;
            }
        }
    }
    td {
        color: $tdColor;
    }
    th,
    td {
        padding: 20px 10px;
    }

    table {
        tbody {
            display: block;
            overflow-y: scroll;
        }
    }

    table thead,
    tbody tr {
        display: table;
        width: 100%;
    }
}
</style>
```
