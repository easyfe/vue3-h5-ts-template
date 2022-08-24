<template>
    <div
        class="product-list-item"
        :style="{
            ...lineNumberVar
        }"
        @click="onClick(item)"
    >
        <div class="item-card">
            <!-- 自定义卡片内容 -->
            <slot v-if="$slots['card-content']" name="card-content" :row="item"></slot>
            <template v-else>
                <!-- 左 -->
                <!-- 自定义左侧内容 -->
                <template v-if="$slots.left">
                    <div class="left" @click="onStopPropagation">
                        <slot name="left" :row="item"></slot>
                    </div>
                </template>

                <!-- 中 -->
                <!-- 图片信息 -->
                <div class="image">
                    <!-- 自定义图片角标-->
                    <slot v-if="$slots.tag" name="tag" :row="item"></slot>
                    <!-- 通过插槽的形式设置商品图片 -->
                    <slot v-if="$slots.thumb" name="thumb" :row="item"></slot>
                    <van-image
                        v-else
                        v-lazy="item[imageKey]"
                        :lazy-load="lazyLoad"
                        :src="item[imageKey]"
                        fit="cover"
                        v-bind="$attrs"
                    ></van-image>
                </div>

                <!-- 右-->
                <!-- 商品的价格、规格等信息 -->
                <div class="right">
                    <div class="right-top">
                        <div class="title">
                            <!-- 自定义title 前面 的tag  -->
                            <slot v-if="$slots['title-tag']" name="title-tag" :row="item"></slot>
                            <!-- 通过slot自定义标题 -->
                            <slot v-if="$slots.title" name="title" :row="item"></slot>
                            <span v-else>{{ item[titleKey] }}</span>
                        </div>
                        <!-- 自定义 title 下方标签区域    -->
                        <slot v-if="$slots.tags" name="tags" :row="item"></slot>
                    </div>
                    <div class="right-bottom">
                        <!-- 自定义标题下面内容 （标题下面所有内容） -->
                        <slot v-if="$slots['title-footer']" name="title-footer"></slot>
                        <template v-else>
                            <div class="bottom-info">
                                <div class="specAndprice">
                                    <!-- 规格 -->
                                    <div v-if="showSpec" class="size">
                                        <!-- 规格通过slot自定义 -->
                                        <slot v-if="$slots.spec" name="spec" :row="item"></slot>
                                        <span v-else-if="item.spec_name">规格：{{ item.spec_name }}</span>
                                    </div>
                                    <!-- 价格 -->
                                    <div class="price">
                                        <!-- 商品价格 -->
                                        <template v-if="showPrice">
                                            <!-- 通过插槽自定义商品价格 -->
                                            <slot v-if="$slots.price" name="price" :row="item"></slot>
                                            <the-format-money v-else :money="item[priceKey]"></the-format-money>
                                        </template>
                                        <!-- 商品划线价 -->
                                        <template v-if="showScribePrice">
                                            <!-- 通过插槽自定义商品划线价 -->
                                            <slot v-if="$slots['scribe-price']" name="scribe-price" :row="item"></slot>
                                            <span v-else-if="item[scribePriceKey]" class="line-money">
                                                ￥{{ item[scribePriceKey] }}
                                            </span>
                                        </template>
                                        <!-- 自定义商品价格右方区域   -->
                                        <slot v-if="$slots['price-right']" name="price-right" :row="item"></slot>
                                    </div>
                                    <!-- 销量 -->
                                    <div v-if="showSalesVolume" class="num">
                                        <!-- 通过slot自定义销量 -->
                                        <slot v-if="$slots.num" name="num" :row="item"></slot>
                                        <span v-else-if="item[salesVolumeKey]">销量：{{ item[salesVolumeKey] }}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 商品购买数量 -->
                            <div v-if="showGoodsNum" class="bottom-goodsNum">
                                <!-- 通过slot自定义销量 -->
                                <slot v-if="$slots['goods-num']" name="goods-num" :row="item"></slot>
                                <span v-else-if="item[goodsNumKey]">× {{ item[goodsNumKey] }}</span>
                            </div>
                            <!-- 操作区域 -->
                            <div class="bottom-action" @click="onStopPropagation">
                                <!-- 自定义右下角内容 （如：操作按钮） -->
                                <slot v-if="$slots.footer" name="footer"></slot>
                                <template v-else>
                                    <!-- 购物车按钮 -->
                                    <div v-if="showCartIcon" class="add-cart" @click.stop="addCart(item)">
                                        <img src="@/assets/images/base/add-cart.png" alt="" />
                                    </div>
                                    <!-- 步进器-->
                                    <van-stepper
                                        v-if="showStepper"
                                        v-model="value"
                                        :min="min"
                                        :max="max"
                                        :integer="integer"
                                        class="custom-setpper"
                                        @plus="onChange(item)"
                                        @minus="onChange(item)"
                                        @blur="onBlur(item)"
                                    />
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts" name="TheProductCard">
import lodash from "@/utils/tools/lodash";

type interfaceProductCardInfo = {
    /**商品名称*/
    goods_name: string;
    /**商品图片*/
    goods_image: string;
    /**商品价格*/
    item_price: string | number;
    /**规格id*/
    spec?: string[];
    /**规格名称*/
    spec_name?: string;
    /**划线价*/
    scribe_price?: string | number;
    /**销量*/
    sales?: string;
    /** 箱规单位 */
    purchase_unit?: string;
    /**  每箱计数单位 */
    retail_unit?: string;
    /** 每箱数量 */
    unit_conversion?: string;
    /** 商品购买数量 */
    goods_num?: string | number;
};

const props = defineProps({
    /**
     * @param {interfaceProductCardInfo} 商品item数据
     */
    item: {
        type: Object,
        default: () => {
            return {};
        }
    },
    lazyLoad: {
        type: Boolean,
        default: true
    },
    /**
     * @param {boolean} 是否显示步进器
     */
    showStepper: {
        type: Boolean,
        default: false
    },
    /**
     * @param {boolean} 是否显示加入购物车按钮
     */
    showCartIcon: {
        type: Boolean,
        default: false
    },
    /**
     * @param {boolean} 是否显示商品价格
     */
    showPrice: {
        type: Boolean,
        default: true
    },
    /**
     * @param {boolean} 是否显示商品原价(即划线价)
     */
    showScribePrice: {
        type: Boolean,
        default: true
    },
    /**
     * @param {boolean} 是否显示商品描述
     */
    showSpec: {
        type: Boolean,
        default: true
    },
    /**
     * @param {boolean} 是否显示商品销量
     */
    showSalesVolume: {
        type: Boolean,
        default: false
    },
    /**
     * @param {boolean} 是否显示商品购买数量
     */
    showGoodsNum: {
        type: Boolean,
        default: false
    },
    /**
     * @param { number | string} 步进器最小值
     */
    min: {
        type: [Number, String],
        default: 1
    },
    /**
     * @param { number | string} 步进器最大值
     */
    max: {
        type: [Number, String],
        default: 999
    },
    /**
     * @param { boolean} 是否只允许输入整数
     */
    integer: {
        type: Boolean,
        default: true
    },
    /**
     * @param { number | string} 步进器初始值
     */
    initValue: {
        type: [Number, String],
        default: 0
    },
    /**
     * @param { number | string} 商品价格的取值 key
     */
    priceKey: {
        type: String,
        default: "item_price"
    },
    /**
     * @param { number | string} 商品 title 的取值 key
     */
    titleKey: {
        type: String,
        default: "goods_name"
    },
    /**
     * @param { number | string} 商品划线价的取值 key
     */
    scribePriceKey: {
        type: String,
        default: "scribe_price"
    },
    /**
     * @param { number | string} 商品销量的取值 key
     */
    salesVolumeKey: {
        type: String,
        default: "num"
    },
    /**
     * @param { number | string} 商品销量的取值 key
     */
    goodsNumKey: {
        type: String,
        default: "goods_num"
    },
    /**
     * @param { number | string} 商品图片的取值 key
     */
    imageKey: {
        type: String,
        default: "goods_image"
    },
    /**
     * @param { number | string} title 超过几行显示省略号
     */
    lineNumber: {
        type: [Number, String],
        default: 2
    }
});

const lineNumberVar = computed(() => {
    return { "--lineNumber": props.lineNumber };
});

//步进器绑定的值
let value = ref(props.initValue);
//当前触发的item
let detail = reactive({});

/** 异步设置步进器初始值 */
watch(
    () => props.initValue,
    (newVal: number | string) => {
        value.value = newVal;
    }
);
const emits = defineEmits<{
    (e: "change", detail: any, value?: number | string): void;
}>();
/** 定义防抖加减步进器 */
const debounceChange = lodash.debounce(() => {
    emits("change", detail, value.value);
}, 300);
/**
 * 步进器输入框值发生改变时触发
 * @returns {obj} detail  当前商品item
 */
const onChange = (changeDetail: interfaceProductCardInfo): void => {
    Object.assign(detail, changeDetail);
    debounceChange();
};
/** 焦点丢失的情况下触发change事件，用于直接修改步进器的情况 */
const onBlur = (detail: interfaceProductCardInfo): void => {
    let valueTmp = value.value;
    if (valueTmp === "") {
        valueTmp = props.min ?? 1;
    }
    if (props.max && valueTmp > props.max) {
        valueTmp = props.max ?? 999;
    }
    emits("change", detail, valueTmp);
};
/**
 * 点击购物车角标时触发
 * @returns {obj}  当前商品item
 */

const addCart = (detail: interfaceProductCardInfo): void => {
    emits("change", detail);
};
/**
 * 点击商品卡片时触发
 * @returns {obj}  当前item
 */
const onClick = (detail: interfaceProductCardInfo): void => {
    emits("change", detail);
};

/**
 * 阻止事件冒泡、阻止默认事件
 */
const onStopPropagation = (event: any): void => {
    event.stopPropagation();
    event.preventDefault();
};
</script>

<style lang="scss" scoped>
.product-list-item {
    .item-card {
        display: flex;
        flex-direction: row;
        padding: 10px;
        background: #ffffff;
        .left {
            display: flex;
            align-items: center;
        }
        .image {
            width: 178px;
            height: 178px;
            margin-right: 20px;
            position: relative;
            border-radius: 6px;
            overflow: hidden;
            :deep(.van-image) {
                width: 100%;
                height: 100%;
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: space-between;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
            .tips {
                margin-top: 10px;
                font-size: 20px;
                font-weight: 400;
                color: #999999;
                &.tips-flex {
                    margin-top: 0;
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                    align-items: center;
                }
            }
            .right-top {
                .title {
                    font-size: 28px;
                    font-weight: 500;
                    color: #000000;
                    line-height: 40px;
                    //@include text-overflow-line(var(--lineNumber));
                }
            }
            .right-bottom {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;
                .specAndprice {
                    .size {
                        display: block;
                        font-size: 20px;
                        font-weight: 400;
                        color: #999;
                        margin-bottom: 3px;
                    }
                    .price {
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;
                        .line-money {
                            margin-left: 10px;
                            font-size: 20px;
                            font-weight: 400;
                            text-decoration: line-through;
                            color: #999999;
                        }
                    }
                    .num {
                        display: block;
                        font-size: 20px;
                        font-weight: 400;
                        color: #999;
                        margin-top: 3px;
                    }
                }
                .bottom-info {
                    flex: 1;
                }
                .bottom-goodsNum {
                    font-size: 20px;
                    font-weight: 400;
                    color: #999999;
                }
                .bottom-action {
                    .total {
                        font-size: 20px;
                        font-weight: 400;
                        color: #999999;
                    }
                    .add-cart {
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                        font-size: 0;
                        margin: 0 10px 10px 0;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    /** 步进器样式 */
                    :deep(.custom-setpper) {
                        font-size: 20px;
                        color: #000000;
                        input,
                        button {
                            height: 42px;
                            border-radius: 12px;
                            background: #f8f8f8;
                        }
                        button {
                            width: 30px;
                            height: 30px;
                            background: transparent;
                            &.van-stepper__minus,
                            &.van-stepper__plus {
                                color: #000000;
                            }
                            &.van-stepper__minus--disabled,
                            &.van-stepper__plus--disabled {
                                color: #cccccc;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
