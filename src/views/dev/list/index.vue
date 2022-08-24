<template>
    <frame-view>
        <base-list v-model:list="list" :req="req" row-key="" page-key="_page" size-key="_size">
            <template #default>
                <span>slot插槽</span>
            </template>
            <template #item="{ row, index }">
                <div class="title" @click="handleChangeItem(index, row)">
                    <p>title(点击可以修改):{{ row.title }}</p>
                    <p>index:{{ index }}</p>
                </div>
            </template>
        </base-list>
    </frame-view>
</template>

<script lang="ts" setup>
import BaseList from "@/resources/components/base-list/index.vue";
import { testList } from "./api";
import { Toast } from "vant";
let list = ref([]);

const handleChangeItem = (index: number, row: any): void => {
    row.title = `修改时间：${new Date()}`;
};
let test = reactive({ test: 0 });
// const testList = () => {
//     return new Promise((resolve) => {
//         resolve([]);
//     });
// };
const req = computed(() => {
    return {
        fn: testList,
        params: test
    };
});
onMounted(() => {
    Toast("5秒后模拟参数刷新");
    setTimeout(() => {
        test.test = 100;
    }, 5000);
});
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 20px;
}
.title {
    width: 100%;
    height: 200px;
    color: #ffffff;
    background: #1e1e1e;
    font-size: 24px;
    margin-bottom: 20px;
}
</style>
