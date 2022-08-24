<template>
    <frame-view>
        <base-map @confirm="confirm"></base-map>
    </frame-view>
</template>
<script setup lang="ts">
import { GeoLocationType } from "@/types";
import back from "@/utils/tools/back";
const confirm = (res: GeoLocationType): void => {
    console.log("当前选择位置:", res);
    back();
};
</script>
