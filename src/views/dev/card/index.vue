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
                    :init-value="item.num"
                    :lazy-load="false"
                    price-key="purchase_price"
                    @change="changeHandle"
                    @click="clickHandle"
                >
                    <template #title="{ row }"> {{ row.goods_name }}</template>
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
                    @click="clickHandle"
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
                <the-product-card
                    v-for="(item, index) in productList"
                    :key="index"
                    :item="item"
                    @change="changeHandle"
                    @click="clickHandle"
                >
                    <template #tag="scope">
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

        <h1>单独使用商品卡片</h1>
        <h1>自定义左侧内容、自定义规格、自定义箱规、自定义商品图片角标</h1>
        <the-product-card v-for="(item, index) in productList.slice(0, 1)" :key="index" :item="item">
            <!-- 通过插槽自定义商品图片-->
            <template #thumb="{ row }">
                <div class="image">
                    <van-image :src="row.img" fit="cover"></van-image>
                </div>
            </template>
            <!-- 通过插槽自定义左侧内容-->
            <template #left>
                <span class="size">自定义</span>
            </template>
            <!-- 通过插槽自定义规格 -->
            <template #spec="scope">
                <span class="size">自定义{{ scope.row.spec }}</span>
            </template>
            <!-- 通过插槽自定义箱规-->
            <template #carton>
                <span class="size">自定义箱规</span>
            </template>
            <template #tag="scope">
                <!-- 退货/购货 小标 -->
                <div v-if="scope.row.is_purchase || scope.row.is_retreat" class="badge">
                    <!-- 购买 -->
                    <img v-if="scope.row.is_purchase" src="~@/assets/images/base/purchase.png" alt="" />
                    <!-- 退货 -->
                    <img v-else-if="scope.row.is_retreat" src="~@/assets/images/base/retreat.png" alt="" />
                </div>
            </template>
        </the-product-card>

        <h1>单独使用商品卡片</h1>
        <h1>显示步进器</h1>
        <the-product-card
            v-for="(item, index) in productList.slice(0, 1)"
            :key="'in-1-' + index"
            :item="item"
            :show-stepper="true"
            :min="0"
            :integer="false"
            @change="changeHandle"
            @click="clickHandle"
        >
        </the-product-card>

        <h1>单独使用商品卡片(商品标题超出一行显示省略号)</h1>
        <h1>显示步进器</h1>
        <the-product-card
            v-for="(item, index) in productList.slice(0, 1)"
            :key="'in-2-' + index"
            :item="item"
            :show-stepper="true"
            :min="0"
            :integer="false"
            line-number="1"
            @change="changeHandle"
            @click="clickHandle"
        >
        </the-product-card>

        <h1>单独使用商品卡片(显示商品数量)</h1>
        <h1>显示步进器</h1>
        <the-product-card
            v-for="(item, index) in productList.slice(0, 1)"
            :key="'in-3-' + index"
            :item="item"
            :show-goods-num="true"
            goods-num-key="goods_num"
            @click="clickHandle"
        >
        </the-product-card>
    </div>
</template>

<script setup lang="ts">
const productList = ref([
    {
        goods_image: "https://img01.71360.com/file/read/www/M00/78/96/wKj0iWEKOZ6AY2o_AAC_K84PuSU108.jpg", //商品图片
        goods_name: "商品名称", //商品名称
        spec_name: "红色", //规格
        purchase_price: "9939.1", //售价
        scribe_price: 100,
        carton: "1箱（每箱100件）",
        purchase_unit: "箱",
        retail_unit: "个",
        unit_conversion: 12,
        num: 2,
        goods_num: 13
    },
    {
        goods_image: "https://img01.71360.com/file/read/www/M00/78/96/wKj0iWEKOZ6AY2o_AAC_K84PuSU108.jpg",
        goods_name: "商品名称",
        spec_name: "红色",
        purchase_price: "9939.1",
        scribe_price: 100,
        carton: "1箱（每箱100件）",
        purchase_unit: "箱",
        retail_unit: "个",
        unit_conversion: 12,
        num: 3,
        goods_num: 13
    },
    {
        goods_image: "https://img01.71360.com/file/read/www/M00/78/96/wKj0iWEKOZ6AY2o_AAC_K84PuSU108.jpg",
        goods_name: "商品名称",
        spec_name: "红色",
        purchase_price: "9939.1",
        scribe_price: 100,
        carton: "1箱（每箱100件）",
        purchase_unit: "箱",
        retail_unit: "个",
        unit_conversion: 12,
        goods_num: 13
    }
]);
const changeHandle = (detail: any, value: string): void => {
    console.log(detail);
    console.log(value);
};

const clickHandle = (detail: any): void => {
    console.log("点击卡片了", detail);
};
</script>

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
    .title-tag {
        display: inline-block;
        padding: 0 5px;
        height: 30px;
        background: #e1f2ff;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 400;
        color: #0060ff;
        line-height: 30px;
        text-align: center;
    }
    .size {
        display: block;
        margin-top: 16px;
        font-size: 30px;
        font-weight: 400;
        color: #3b3b3b;
    }

    .badge {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 34px;
        height: 38px;
        font-size: 0;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .image {
        width: 160px;
        height: 160px;
        margin-right: 20px;
        position: relative;
        :deep(.van-image) {
            width: 160px;
            height: 160px;
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
