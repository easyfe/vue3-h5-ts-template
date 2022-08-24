<template>
    <frame-view class="page">
        <base-card :config="cellConfig"> </base-card>
    </frame-view>
</template>

<script lang="ts" setup>
import BaseCard from "@/resources/components/base-card/index.vue";
import s1 from "@/assets/images/base/user-phone@2x.png";

const cellConfig = reactive({
    header: {
        title: "收货人",
        icon: {
            url: s1,
            width: 16,
            height: 16
        },
        tip: "(最多6个字)"
    },
    columns: [
        {
            label: "收货人电话",
            value: "15156066843",
            isPhone: true,
            height: 50,
            icon: {
                url: s1,
                width: 16,
                height: 16
            },
            buttonClass: {
                color: "red"
            },
            buttonCallBack: function (): void {
                alert(1);
            }
        },
        {
            label: "订单编号",
            value: "张三"
        },
        {
            label: "代理等级",
            tag: "联创"
        },
        {
            label: "留言",
            button: "查看",
            buttonCallBack: function (): void {
                alert("查看");
            }
        },
        {
            label: "收货地址",
            value: "这是张三的收货地址巴拉巴卡巴拉撒大声地",
            longValue: true
        }
    ]
});
</script>

<style lang="scss" scoped>
.page {
    padding: 50px 20px 0;
}
</style>
