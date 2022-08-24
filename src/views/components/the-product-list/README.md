### 组件名称：商品列表

### 场景

### API

#### Props

| 参数  | 说明                               | 类型   | 默认值 |
| ----- | ---------------------------------- | ------ | ------ |
| title | 标题，也可以通过 slot="title" 设置 | String | ------ |

#### Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |

#### Slots

| 名称      | 说明                                      |
| --------- | ----------------------------------------- |
| top       | 自定义上方区域，如标题、状态              |
| item_card | 商品信息 ，用于展示商品的图片、价格等信息 |
| bottom    | 自定义下方区域 ，如操作按钮等             |

#### 用法

```html
<template>
    <div class="card">
        <h1>商品卡片(包含步进器)</h1>
        <the-product-list>
            <template #item_card>
                <the-product-card
                    v-for="(item, index) in productList"
                    :key="index"
                    :item="item"
                    :show-stepper="true"
                    @change="changeHandle"
                >
                </the-product-card>
            </template>
        </the-product-list>
        <h1>商品卡片(包含购物车按钮)</h1>
        <the-product-list>
            <template #item_card>
                <the-product-card
                    v-for="(item, index) in productList"
                    :key="index"
                    :item="item"
                    :show-catr-icon="true"
                    @change="changeHandle"
                >
                </the-product-card>
            </template>
        </the-product-list>
        <h1>商品卡片（包含卡片标题、状态、图片角标、卡片底部操作）</h1>
        <the-product-list>
            <template #top>
                <div class="title-info">
                    <span>商品信息</span>
                    <span class="status">待发货</span>
                </div>
            </template>
            <template #item_card>
                <the-product-card v-for="(item, index) in productList" :key="index" :item="item" @change="changeHandle">
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
            </template>
            <template #bottom>
                <div class="bottom">
                    <p>关联订单号：123456789654123</p>
                    <div>
                        <div>确认收货</div>
                    </div>
                </div>
            </template>
        </the-product-list>
    </div>
</template>
```

```ts
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { interfaceProductCardInfo } from "@/transactions/interface/index";
import TheProductList from "@/views/components/the-product-list/index.vue";
import TheProductCard from "@/views/components/the-product-card/index.vue";
@Component({
    name: "Card",
    components: {
        TheProductList,
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
            is_retreat: true //退货标识
        },
        {
            img: "https://img01.71360.com/file/read/www/M00/78/96/wKj0iWEKOZ6AY2o_AAC_K84PuSU108.jpg",
            goods_name: "商品名称",
            spec_name: "红色",
            purchase_price: "9939.1",
            market_price: 100,
            carton: "1箱（每箱100件）",
            is_purchase: true //购买标识
        },
        {
            img: "https://img01.71360.com/file/read/www/M00/78/96/wKj0iWEKOZ6AY2o_AAC_K84PuSU108.jpg",
            goods_name: "商品名称",
            spec_name: "红色",
            purchase_price: "9939.1",
            market_price: 100,
            carton: "1箱（每箱100件）",
            is_retreat: true //退货标识
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
