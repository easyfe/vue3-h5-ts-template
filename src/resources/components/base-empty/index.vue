<template>
    <van-empty
        :class="['base-empty', image ? '' : 'base-empty-type']"
        :image="image || iconMap[type].icon"
        :description="desc || iconMap[type].message"
    >
        <slot></slot>
    </van-empty>
</template>

<script lang="ts" setup>
import result from "@/assets/images/empty/result@2x.png";
import address from "@/assets/images/empty/address@2x.png";
import card from "@/assets/images/empty/card@2x.png";
import coupons from "@/assets/images/empty/coupons@2x.png";
import data from "@/assets/images/empty/data@2x.png";
import error from "@/assets/images/empty/error@2x.png";
import live from "@/assets/images/empty/live@2x.png";
import message from "@/assets/images/empty/message@2x.png";
import money from "@/assets/images/empty/money@2x.png";
import network from "@/assets/images/empty/network@2x.png";
import open from "@/assets/images/empty/open@2x.png";
import order from "@/assets/images/empty/order@2x.png";
import uphold from "@/assets/images/empty/uphold@2x.png";

const iconMap = reactive<Record<string, any>>({
    result: {
        icon: result,
        message: "搜索无结果"
    },
    address: {
        icon: address,
        message: "暂无地址"
    },
    card: {
        icon: card,
        message: "无商品"
    },
    coupons: {
        icon: coupons,
        message: "无优惠券"
    },
    data: {
        icon: data,
        message: "暂无数据"
    },
    error: {
        icon: error,
        message: "页面发生错误"
    },
    live: {
        icon: live,
        message: "暂无直播"
    },
    message: {
        icon: message,
        message: "暂无消息"
    },
    money: {
        icon: money,
        message: "暂无余额明细"
    },
    network: {
        icon: network,
        message: "网络错误"
    },
    open: {
        icon: open,
        message: "暂未开业"
    },
    order: {
        icon: order,
        message: "您还没有相关订单"
    },
    uphold: {
        icon: uphold,
        message: "功能未开放"
    }
});
defineProps({
    //空类型
    type: {
        type: String,
        default: "result"
    },
    //自定义描述
    desc: {
        type: String,
        default: ""
    },
    //自定义图片
    image: {
        type: String,
        default: ""
    }
});
</script>

<style lang="scss" scoped>
.base-empty-type {
    :deep(.van-empty__description) {
        margin-top: -30px;
    }
}
</style>
