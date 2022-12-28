<template>
    <frame-view>
        <code>谷歌浏览器需要使用https访问</code>
        <h1 @click="navLocation">点击原生定位</h1>
        <h1 @click="txLocation">点击腾讯定位</h1>
        <h1 @click="toMap">点击前往腾讯地图选择</h1>
        <span>当前地理位置：</span>
        <h1>{{ addressDetail }}</h1>
    </frame-view>
</template>

<script lang="ts" setup>
import { navGeoLocation, txGeolocation } from "@/utils/tools/geolocation";
import { Toast } from "vant";

let addressDetail = ref<any>(null);
const router = useRouter();
const toMap = (): void => {
    router.push({
        name: "common-map"
    });
};
const navLocation = () => {
    Toast.loading({ duration: 0 });
    navGeoLocation()
        .then((res) => {
            Toast.clear();
            addressDetail.value = res;
        })
        .catch((err) => {
            Toast(String(err));
        });
};
const txLocation = () => {
    Toast.loading({ duration: 0 });
    txGeolocation()
        .then((res) => {
            addressDetail.value = res;
        })
        .finally(() => {
            Toast.clear();
        });
};
</script>
<style lang="scss" scoped>
h1 {
    font-size: 50px;
}
span {
    font-size: 40px;
}
code {
    font-size: 40px;
}
</style>
