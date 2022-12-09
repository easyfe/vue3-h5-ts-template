<template>
    <div class="base-cell">
        <div class="base-cell-container">
            <div v-if="cellConfig.header" class="base-cell-item base-cell-header">
                <div class="base-cell-item-left">
                    <img
                        v-if="cellConfig.header.icon"
                        class="base-cell-item-left-icon"
                        :src="cellConfig.header.icon.url"
                        :width="cellConfig.header.icon.width"
                        :height="cellConfig.header.icon.height"
                    />
                    <span class="title">{{ cellConfig.header.title }}</span>
                    <span v-if="cellConfig.header.tip" class="base-cell-item-left-tip">{{
                        cellConfig.header.tip
                    }}</span>
                </div>
                <div class="base-cell-item-right"></div>
            </div>

            <div v-for="(item, index) in cellConfig.columns" :key="index">
                <div
                    v-if="!item.isHide"
                    class="base-cell-item"
                    :class="{ 'base-cell-item-special': item.longValue }"
                    :style="{ height: `${item.height}px` }"
                >
                    <div class="base-cell-item-left" :style="item.labelClass">
                        <span>{{ item.label }}</span>
                    </div>
                    <div class="base-cell-item-right">
                        <template v-if="item.isPhone">
                            <a :href="`tel:${item.value}`">
                                <span
                                    v-if="item.value"
                                    class="base-cell-item-text"
                                    :class="{ 'base-cell-item-text-special': item.longValue }"
                                    :style="item.valueClass"
                                    >{{ item.value }}</span
                                >
                            </a>
                        </template>
                        <template v-else>
                            <span
                                v-if="item.value"
                                class="base-cell-item-text"
                                :class="{ 'base-cell-item-text-special': item.longValue }"
                                :style="item.valueClass"
                                >{{ item.value }}</span
                            >
                        </template>

                        <span
                            v-if="item.button"
                            class="base-cell-item-btn"
                            :style="item.buttonClass"
                            @click.stop="item.buttonCallBack"
                            >{{ item.button }}</span
                        >

                        <span v-if="item.tag" class="base-cell-item-right-tag">{{ item.tag }}</span>

                        <template v-if="item.isPhone">
                            <a :href="`tel:${item.value}`">
                                <span v-if="item.icon" class="base-cell-item-right-span">
                                    <img
                                        class="base-cell-item-right-icon"
                                        :src="item.icon.url"
                                        :width="item.icon.width"
                                        :height="item.icon.height"
                                    />
                                </span>
                            </a>
                        </template>

                        <template v-else>
                            <span v-if="item.icon">
                                <img
                                    class="base-cell-item-right-icon"
                                    :src="item.icon.url"
                                    :width="item.icon.width"
                                    :height="item.icon.height"
                                />
                            </span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CardProp } from "types";
defineProps({
    cellConfig: {
        type: Object
    }
});
</script>

<style lang="scss" scoped>
.base-cell-container {
    background-color: #fff;
    .base-cell-item {
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        padding: 0 20px;
        overflow: hidden;
        justify-content: space-between;
        .base-cell-item-right,
        .base-cell-item-left {
            display: flex;
            align-items: center;
            font-size: 28px;
            font-weight: 500;
            color: #3b3b3b;
        }
        .base-cell-item-left {
            position: relative;
            .title {
                font-weight: bold;
            }
            .base-cell-item-left-icon {
                margin-right: 8px;
            }
            .base-cell-item-left-tip {
                margin-left: 12px;
                color: #999999;
                font-weight: 100;
            }
        }
        .base-cell-item-right {
            position: relative;
            .base-cell-item-btn {
                font-size: 28px;
                font-weight: 500;
                color: #e94534;
                margin-left: 30px;
            }
            .base-cell-item-right-span {
                display: flex;
            }
            .base-cell-item-right-icon {
                margin-left: 11px;
            }
            .base-cell-item-right-tag {
                display: inline-block;
                background: linear-gradient(-38deg, #f12f1a 0%, #ff6e39 100%);
                border-radius: 6px;
                font-size: 24px;
                color: #ffffff;
                padding: 4px 7px;
            }
            .base-cell-item-text {
                color: #999999;
            }
            .base-cell-item-right-address {
                height: 120px;
            }
        }
    }
    .base-cell-item-special {
        align-items: flex-start;
        height: 100%;
        padding: 27px 20px;
    }
    .base-cell-item-text-special {
        width: 50vw;
        text-align: right;
    }
}

.base-cell-item::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 16px;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    transform: scaleY(0.5);
}
</style>
