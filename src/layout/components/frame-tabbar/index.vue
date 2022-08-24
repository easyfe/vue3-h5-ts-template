<template>
    <van-tabbar :fixed="false" route active-color="#F12F1A" inactive-color="#000" :safe-area-inset-bottom="true">
        <template v-for="(item, index) in tabs" :key="index">
            <van-tabbar-item replace :to="item.router" :badge="item.badge">
                <span>{{ item.title }}</span
                ><template #icon="props"><img :src="props.active ? item.active : item.inactive" /></template
            ></van-tabbar-item>
        </template>
    </van-tabbar>
</template>

<script setup lang="ts">
import tabbar from "@/config/tabbar";
const tabs = reactive(tabbar);
</script>

<style lang="scss" scoped>
:deep(.van-info) {
    background-color: #fb2010;
}
:deep(.van-hairline--top-bottom::after),
.van-hairline-unset--top-bottom::after {
    border-bottom-width: 0;
}
</style>
