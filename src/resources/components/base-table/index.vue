<template>
    <div
        id="BaseTable"
        v-bind="$attrs"
        class="base-table"
        :style="{
            ...borderColorVar,
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

<script lang="ts" setup>
import handleGetRealPx from "@/utils/tools/get-realpx/index";

const props = defineProps({
    /**
     * @param {array} 显示的数据
     */
    tableData: {
        type: Array,
        default: () => {
            return [];
        }
    },
    /**
     * @param {array}  列数以及对应的取值字段
     * @param {string} item.label  header
     * @param {string} item.rowKey  列数据的 Key
     * @param {string} item.thColor  th对应列字体颜色
     * @param {string} item.tdColor  td对应列字体颜色
     * @param {string} item.width      对应列的宽度
     */
    columns: {
        type: Array,
        default: () => {
            return [];
        }
    },
    /**
     * @param {boolean}  是否带有纵向边框
     */
    border: {
        type: Boolean,
        default: false
    },
    /**
     * @param {number|string}  Table高度
     */
    height: {
        type: [Number, String]
    },
    /**
     * @param {number|string}  表头高度 默认单位为px
     */
    theadRowHeight: {
        type: [Number, String]
    },
    /**
     * @param {number|string}  表体行高度 默认单位为px
     */
    tbodyRowHeight: {
        type: [Number, String]
    },
    /**
     * @param {number|string}  Table宽度 默认单位为px
     */
    width: {
        type: [Number, String]
    },
    /**
     * @param {string}  空数据时显示的文本内容，也可以通过 slot="empty" 设置
     */
    emptyText: {
        type: String,
        default: "暂无数据"
    },
    /**
     * @param {number | string}  空数据时显示的图片大小，默认单位为px
     */
    imageSize: {
        type: [Number, String]
    },
    /**
     * @param {string}  表头自定义图标，image为传入的插槽名称,通过 :slot="mage" 设置
     */
    image: {
        type: String
    },
    /**
     * @param {boolean}  列的宽度是否自撑开
     */
    fit: {
        type: Boolean,
        default: true
    },
    /**
     * @param {number | string}  只显示 showRowNum 行，剩下内容不显示 ，默认不隐藏
     */
    showRowNum: {
        type: [Number, String],
        default: Infinity
    },
    /**
     * @param {string}  Table边框颜色
     */
    borderColor: {
        type: String,
        default: "#e8e8e8"
    }
});

const borderColorVar = reactive({
    "--borderColor": props.borderColor
});

const getRealPx = (px: number | string): string => {
    if (px === "auto") return "auto";
    return handleGetRealPx(+px) + "px";
};
</script>

<style lang="scss" scoped>
$bgColor: #ffffff;
$thBgColor: #f8f8f8;
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
        border: 0 solid var(--borderColor);
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
