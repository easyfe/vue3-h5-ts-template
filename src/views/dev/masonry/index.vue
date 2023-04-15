<template>
    <frame-view>
        <base-list
            v-model:list="list"
            :req="req"
            row-key="rows"
            :masonry="true"
            :masonry-config="{ columns: 3, gutter: 2 }"
            class="test"
        >
            <template #item="{ row: item }">
                <div class="item">
                    <van-image :src="item.image" lazy-load />
                    <div>{{ item.name }}</div>
                    <div>{{ item.market_price }}</div>
                </div>
            </template>
        </base-list>
    </frame-view>
</template>
<script setup lang="ts">
import { testList } from "./api";
const req = computed(() => {
    return {
        fn: testList,
        params: {
            filter: {},
            status: 0,
            need_coupon: true,
            source: 999,
            is_show_all: 1
        }
    };
});
const list = ref([]);
</script>
<style scoped lang="scss">
.test {
    padding: 0 20px;
    .masonry-list {
        margin-right: 20px;
    }
    .item {
        background-color: #fff;
        border-radius: 20px;
        margin-bottom: 30px;
        overflow: hidden;
    }
}
</style>
