<template>
    <frame-view>
        <code>谷歌浏览器需要使用https访问</code>
        <h5 @click="toMap">点击前往腾讯地图选择</h5>
        <span>当前地理位置：</span>
        <h6>{{ addressDetail }}</h6>
    </frame-view>
</template>

<script lang="ts" setup>
import geoLocation from "@/utils/tools/geolocation";
import { Toast } from "vant";

let addressDetail = ref<any>(null);
const router = useRouter();
const toMap = (): void => {
    router.push({
        name: "common-map"
    });
};
onMounted(() => {
    geoLocation()
        .then((res) => {
            addressDetail.value = res;
        })
        .catch((err) => {
            Toast(String(err));
        });
});
</script>
<style lang="scss" scoped>
span {
    font-size: 32px;
}
</style>
