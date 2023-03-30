<template>
    <frame-view>
        <base-skeleton :list="skeList"></base-skeleton>
    </frame-view>
</template>

<script lang="ts" setup>
const skeList = [
    //招牌
    { width: 702, height: 167, left: 24, top: 24 },
    //切换卡
    { width: 128, height: 45, left: 30, top: 227 },
    { width: 128, height: 45, left: 218, top: 227 },
    { width: 128, height: 45, left: 406, top: 227 },
    { width: 128, height: 45, left: 594, top: 227 },
    //基本信息
    { width: 112, height: 45, left: 31, top: 340 },
    { width: 112, height: 45, left: 31, top: 470 },
    { width: 112, height: 45, left: 31, top: 600 },
    { width: 112, height: 45, left: 31, top: 730 },
    { width: 112, height: 45, left: 31, top: 860 },
    { width: 500, height: 80, left: 217, top: 340 },
    { width: 500, height: 80, left: 217, top: 470 },
    { width: 500, height: 80, left: 217, top: 600 },
    { width: 500, height: 80, left: 217, top: 730 },
    { width: 500, height: 80, left: 217, top: 860 },
    //服务评价
    { width: 690, height: 45, left: 30, top: 974 },
    { width: 84, height: 84, left: 54, top: 1064, radius: 42 },
    { width: 168, height: 40, left: 158, top: 1086 },
    { width: 650, height: 37, left: 54, top: 1172 },
    { width: 690, height: 74, left: 54, top: 1228 },
    { width: 202, height: 202, left: 62, top: 1321 },
    { width: 202, height: 202, left: 274, top: 1321 },
    { width: 202, height: 202, left: 486, top: 1321 }
];
</script>
