### 组件名称：商品卡片

### 场景

### API

#### Props

| 参数            | 说明                       | 类型           | 默认值       | 是否必传 |
| --------------- | -------------------------- | -------------- | ------------ | -------- |
| item            | 商品数据                   | Object         | ------       | 必传     |
| showStepper     | 是否显示步进器             | Boolean        | false        | 非必传   |
| showCatrIcon    | 是否显示加入购物车按钮     | Boolean        | false        | 非必传   |
| showPrice       | 是否显示商品价格           | Boolean        | true         | 非必传   |
| showScribePrice | 是否显示商品原价(即划线价) | Boolean        | true         | 非必传   |
| showSpec        | 是否显示商品描述           | Boolean        | true         | 非必传   |
| showSalesVolume | 是否显示商品销量数量       | Boolean        | false        | 非必传   |
| showGoodsNum    | 是否显示商品购买数量       | Boolean        | false        | 非必传   |
| min             | 步进器最小值               | Number, String | 1            | 非必传   |
| max             | 步进器最大值               | Number, String | 999          | 非必传   |
| integer         | 是否只允许输入整数         | boolean        | true         | 非必传   |
| initValue       | 步进器初始值               | Number, String | 0            | 非必传   |
| lazyLoad        | 是否开启图片懒加载         | Boolean        | true         | 非必传   |
| lineNumber      | title 超过几行显示省略号   | Number, String | 2            | 非必传   |
| priceKey        | 商品价格的取值 key         | String         | item_price   | 非必传   |
| scribePriceKey  | 商品划线价的取值 key       | String         | scribe_price | 非必传   |
| salesVolumeKey  | 商品销量的取值 key         | String         | num          | 非必传   |
| goodsNumKey     | 商品购买数量的取值 key     | String         | num          | 非必传   |
| imageKey        | 商品图片的取值 key         | String         | goods_image  | 非必传   |
| titleKey        | 商品 title 的取值 key      | String         | goods_name   | 非必传   |

#### Events

| 事件名 | 说明                                             | 回调参数                                                   |
| ------ | ------------------------------------------------ | ---------------------------------------------------------- |
| change | 步进器输入框值发生改变 或者 点击购物车角标时触发 | detail：object 当前商品信息 ，value：string 步进器绑定的值 |
| click  | 点击商品卡片时触发                               | detail：object 当前商品信息                                |

#### Slots

| 名称         | 说明                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------- |
| tag          | 自定义图片角标                                                                                                 |
| thumb        | 自定义商品图片                                                                                                 |
| title        | 自定义标题                                                                                                     |
| title-tag    | 自定义 title 前面 的 tag                                                                                       |
| tags         | 自定义 title 下方标签区域                                                                                      |
| spec         | 自定义规格                                                                                                     |
| num          | 自定义数量                                                                                                     |
| carton       | 自定义箱规                                                                                                     |
| price        | 自定义商品价格                                                                                                 |
| price-right  | 自定义商品价格右方区域                                                                                         |
| scribe-price | 自定义商品划线价                                                                                               |
| left         | 自定义左侧内容(商品图片左侧，测试卡片排版结构为 左侧自定义内容（左）、商品图片信息（中）、商品价格等信息（右） |
| title-footer | 自定义标题下面内容 （标题下面所有内容）                                                                        |
| footer       | 自定义右下角内容 （如：操作按钮）                                                                              |
| card-content | 自定义卡片所有内容                                                                                             |

#### 用法

```html
<template>
    <div class="card">
        <h1>商品list item组件</h1>
        <h1>自定义左侧内容、自定义规格、自定义箱规、自定义商品图片角标</h1>
        <the-product-card v-for="(item, index) in productList.slice(0, 1)" :key="index" :item="item">
            <!-- 通过插槽自定义左侧内容-->
            <template slot="left">
                <span class="size">自定义</span>
            </template>
            <!-- 通过插槽自定义规格 -->
            <template slot="spec" slot-scope="scope">
                <span class="size">自定义{{ scope.row.spec_name }}</span>
            </template>
            <!-- 通过插槽自定义箱规-->
            <template #carton>
                <span class="size">自定义箱规</span>
            </template>
            <template slot="tag" slot-scope="scope">
                <!-- 退货/购货 小标 -->
                <div v-if="scope.row.is_purchase || scope.row.is_retreat" class="badge">
                    <!-- 购买 -->
                    <img v-if="scope.row.is_purchase" src="~@/assets/images/base/purchase.png" alt="" />
                    <!-- 退货 -->
                    <img v-else-if="scope.row.is_retreat" src="~@/assets/images/base/retreat.png" alt="" />
                </div>
            </template>
        </the-product-card>
        <h1>显示步进器</h1>
        <the-product-card
            v-for="(item, index) in productList"
            :key="index"
            :item="item"
            :show-stepper="true"
            @change="changeHandle"
        >
        </the-product-card>
    </div>
</template>
```

```ts
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TheProductCard from "@/views/components/the-product-card/index.vue";
@Component({
    name: "Card",
    components: {
        TheProductCard
    }
})
export default class Card extends Vue {
    productList = [
        {
            img: "https://img01.71360.com/file/read/www/M00/78/96/wKj0iWEKOZ6AY2o_AAC_K84PuSU108.jpg", //商品图片
            goods_name: "商品名称", //商品名称
            spec_name: "红色", //规格
            purchase_price: "9939.1", //售价
            market_price: 100, //划线价
            carton: "1箱（每箱100件）", //箱规
            step: true //是否显示步进器
        }
    ];

    changeHandle(detail: interfaceProductCardInfo, value: string): void {
        console.log("触发了", detail, value);
    }
}
</script>
```

```scss
<style lang="scss" scoped>
.card {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px 20px 50px 20px;
    overflow-x: auto;
    h1 {
        font-size: 36px;
    }
    .title-info {
        height: 29px;
        font-size: 30px;
        font-weight: 500;
        color: #000000;
        line-height: 30px;
        padding: 0 10px;
        margin: 15px 0;
        .status {
            float: right;
            color: rgb(243, 133, 7);
        }
    }
    .bottom {
        p {
            height: 29px;
            font-size: 30px;
            font-weight: 500;
            color: #000000;
            line-height: 30px;
            padding: 0 10px;
            margin: 25px 0;
            text-align: right;
        }
        & > div {
            height: 56px;
            line-height: 56px;
            text-align: center;
            div {
                float: right;
                width: 190px;
                height: 100%;
                border: 1px solid #f12f1a;
                border-radius: 28px;
                font-size: 26px;
                color: #f12f1a;
                margin: 0 0 25px 0;
            }
        }
    }
}
</style>
```
