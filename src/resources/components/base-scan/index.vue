<template>
    <van-popup v-model:show="model" class="scan-popup">
        <div class="scan-box" @click="model = false">
            <van-loading v-if="scanLoading" size="50" color="#1989fa" vertical class="scan-box__loading">
                {{ tipMsg }}
            </van-loading>
            <video id="video" ref="video" class="video" autoplay></video>
        </div>
    </van-popup>
</template>

<script setup lang="ts" name="BaseScan">
import { showToast } from "vant";
import { BrowserMultiFormatReader } from "@zxing/library";
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits<{
    (e: "update:modelValue", data: boolean): void;
    (e: "success", date: string): void;
}>();
const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (newVal) => {
        emits("update:modelValue", newVal);
    }
});
watch(
    () => props.modelValue,
    (newVal) => {
        newVal && openScan();
    }
);
// 扫码数据
let codeReader = ref(new BrowserMultiFormatReader());
let tipMsg = ref("请扫描条码，正在尝试识别....");
let scanLoading = ref(false);
// 打开扫码
const openScan = async (): Promise<void> => {
    try {
        tipMsg.value = "正在调用后置摄像头...";
        scanLoading.value = true;
        const videoInputDevices = await codeReader.value.getVideoInputDevices();
        // 判断是否有摄像头
        if (videoInputDevices.length) {
            // 默认获取第一个摄像头设备id
            let firstDeviceId = videoInputDevices[0].deviceId;
            // 获取第一个摄像头设备的名称
            const videoInputDeviceslablestr = JSON.stringify(videoInputDevices[0].label);
            if (videoInputDevices.length > 1) {
                // 判断是否后置摄像头
                if (videoInputDeviceslablestr.indexOf("back") > -1) {
                    firstDeviceId = videoInputDevices[0].deviceId;
                } else {
                    firstDeviceId = videoInputDevices[1].deviceId;
                }
            }
            decodeFromInputVideoFunc(firstDeviceId);
        }
    } catch (error) {
        console.error(error);
        showToast("未发现摄像头,请检查摄像头是否正常!");
        scanLoading.value = false;
        model.value = false;
    }
};
const decodeFromInputVideoFunc = (firstDeviceId: any): void => {
    codeReader.value.reset();
    codeReader.value.decodeFromInputVideoDeviceContinuously(firstDeviceId, "video", (result: any, error: any) => {
        if (result) {
            model.value = false;
            emits("success", result.text.toString());
        }
        if (error && !error) {
            showToast("识别失败,请重试!");
            console.error(error);
        }
    });
};
</script>
<style scoped lang="scss">
.scan-popup {
    &.van-popup {
        background-color: transparent;
    }
    .scan-box {
        width: 100vw;
        height: 100vh;
        position: relative;

        // 加载遮罩层
        .scan-box__loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .video {
            width: 100vw;
            height: 100vh;
        }
    }
}
</style>
