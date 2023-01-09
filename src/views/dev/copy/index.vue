<template>
    <frame-view class="copy">
        <h1>以指令的形式调用</h1>
        <div class="copy-list-item">
            电话：{{ mobile }}
            <span
                v-copy="{
                    value: mobile
                }"
                class="copy-btn"
            >
                &nbsp;复制
            </span>
        </div>
        <h1>以指令的形式调用(自定义成功、或者失败提示)</h1>
        <div class="copy-list-item">
            电话：{{ mobile }}
            <span
                v-copy="{
                    value: mobile,
                    onSuccess,
                    onError
                }"
                class="copy-btn"
            >
                &nbsp;复制
            </span>
        </div>
        <h1>以method的形式调用</h1>
        <van-notice-bar left-icon="volume-o" text="注意：该方法支持Promise 风格 调用，成功/失败交互需要自己写。" />
        <div class="copy-list-item">
            电话：{{ mobile }}
            <span class="copy-btn" @click="copy">复制</span>
        </div>
    </frame-view>
</template>

<script lang="ts" setup>
import handlerCopy from "@/utils/tools/copy";
import { showDialog } from "vant";

const mobile = ref("13649259704");

/**
 * 成功的回调
 * @returns {type}  回调参数: {e}
 */
const onSuccess = (e: string): void => {
    console.log(e);
};
/**
 * 失败的回调
 * @returns {type}  回调参数: {e}
 */
const onError = (e: string): void => {
    console.log(e);
};

const copy = (): void => {
    handlerCopy(mobile.value)
        .then((res) => {
            showDialog({
                message: res
            });
        })
        .catch((err) => {
            showDialog({
                message: err
            });
        });
};
</script>

<style lang="scss" scoped>
.copy {
    h1 {
        font-size: 36px;
    }
    .info {
    }
    .copy-list-item {
        background: #ffffff;
        padding: 20px;
        line-height: 50px;
        font-size: 28px;
        font-weight: 400;
        color: #3b3b3b;
        border-radius: 10px;
        margin-top: 20px;
        .copy-btn {
            float: right;
            font-weight: 400;
            color: #e94534;
        }
    }
}
</style>
