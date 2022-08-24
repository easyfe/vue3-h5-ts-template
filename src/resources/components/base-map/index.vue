<template>
    <div class="map">
        <iframe
            id="mapPage"
            width="100%"
            height="100%"
            frameborder="0"
            src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=SJ5BZ-HVT6X-O6J4H-7C5JA-R6HWS-4ABSV&referer=myapp&policy=1"
        >
        </iframe>
    </div>
</template>

<script setup lang="ts" name="BaseMap">
import session from "@/utils/tools/session";
import { GeoLocationType } from "@/types";

const emits = defineEmits<{
    (e: "confirm", res: GeoLocationType): void;
}>();

//数据定位信息获取
const returnLocation = (loc: GeoLocationType): void => {
    session.setGeoLocation(loc);
    emits("confirm", loc);
};

onMounted(() => {
    window.addEventListener(
        "message",
        function (event) {
            // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            const loc = event.data;
            if (loc && loc.module == "locationPicker") {
                //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                returnLocation(loc);
            }
        },
        false
    );
});
</script>

<style scoped lang="scss">
.map {
    width: 100vw;
    height: 100vh;
}
</style>
