<template>
    <frame-view>
        <div class="table">
            <h1>有数据</h1>
            <base-table
                :table-data="tableData"
                :columns="columns"
                :border="true"
                :thead-row-height="50"
                tbody-row-height="100"
                :width="710"
                border-color="#999999"
            ></base-table>

            <h1>无数据(自定义)</h1>
            <base-table :table-data="[]" :columns="columns" :border="true" :thead-row-height="50" :width="710">
                <template #empty>
                    <div>暂无数据</div>
                </template>
            </base-table>

            <h1>无数据(使用表格自带的无数据展示)</h1>
            <base-table :table-data="[]" :columns="columns" :border="true" :thead-row-height="50" :width="710">
            </base-table>

            <h1>纵向滚动</h1>
            <base-table
                :table-data="tableData"
                :columns="columns"
                :border="true"
                :thead-row-height="50"
                height="300"
                tbody-row-height="100"
                :width="699"
            ></base-table>

            <h1>横向滚动</h1>
            <base-table
                :table-data="tableData"
                :columns="columnsNew"
                :border="true"
                :thead-row-height="50"
                tbody-row-height="100"
                :width="710"
            ></base-table>

            <h1>只显示3行</h1>
            <base-table
                :table-data="tableData"
                :columns="columns"
                show-row-num="3"
                :border="true"
                :thead-row-height="50"
                tbody-row-height="100"
                :width="710"
            ></base-table>
        </div>
    </frame-view>
</template>

<script lang="ts" setup>
import BaseTable from "@/resources/components/base-table/index.vue";

const tableData = reactive([
    {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
    },
    {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄"
    },
    {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄"
    },
    {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄"
    },
    {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄"
    },
    {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄"
    }
]);

const columns = reactive([
    {
        label: "日期",
        rowKey: "date",
        width: "200"
    },
    {
        label: "姓名",
        rowKey: "name",
        width: "150"
    },
    {
        label: "地址",
        rowKey: "address",
        thColor: "#3B3B3B",
        tdColor: "#ED0017"
    }
]);
const columnsNew = reactive([
    {
        label: "日期",
        rowKey: "date",
        width: "200"
    },
    {
        label: "姓名",
        rowKey: "name",
        width: "300"
    },
    {
        label: "地址",
        rowKey: "address",
        thColor: "#3B3B3B",
        tdColor: "#ED0017",
        width: "400"
    }
]);
</script>

<style lang="scss" scoped>
.table {
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 30px 0;
    overflow: auto;
    h1 {
        padding: 0 20px;
        font-size: 36px;
    }
}
</style>
