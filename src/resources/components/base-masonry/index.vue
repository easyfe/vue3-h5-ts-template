<template>
    <div class="masonry-content">
        <div
            v-for="(item1, index1) in privateList"
            :key="index1"
            class="masonry-list"
            :style="{ width: `${100 / props.columns - props.gutter}%` }"
        >
            <template v-for="(item2, index2) in item1.list" :key="index2">
                <slot name="item" :row="item2" :index="index"> </slot>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts" name="BaseMasonry">
import imageHelper from "@/utils/helper/image";
type MasonryProps = {
    //间隙，百分比
    gutter?: number;
    columns?: number;
    list: Record<string, any>[];
    init?: boolean;
};
const props = withDefaults(defineProps<MasonryProps>(), {
    gutter: 1,
    init: true,
    columns: 2
});
const privateList = ref<{ list: Record<string, any>[]; height: number }[]>([]);
let index = 0;
watch(
    () => props.init,
    (newVal) => {
        if (newVal) {
            index = 0;
        }
    }
);
watch(
    () => props.list,
    (newVal) => {
        if (props.init) {
            privateList.value = [];
        }
        while (index < newVal.length) {
            const privateListIndex = index % props.columns;
            if (!privateList.value[privateListIndex]) {
                privateList.value[privateListIndex] = {
                    list: [],
                    height: 0
                };
            }
            const tmpValue = newVal[index];
            //TODO:应该判断取当前高度最低的列进行塞入新元素
            privateList.value[privateListIndex]?.list.push(tmpValue);
            imageHelper.getWidthHeight(tmpValue.image).then((res) => {
                tmpValue._width = res.width;
                tmpValue._height = res.height;
            });
            index++;
        }
    },
    {
        deep: true
    }
);
</script>
<style scoped lang="scss">
.masonry-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .masonry-list {
        display: flex;
        flex-direction: column;
        .masonry-item {
            display: block;
            margin-bottom: 12px;
        }
    }
}
</style>
