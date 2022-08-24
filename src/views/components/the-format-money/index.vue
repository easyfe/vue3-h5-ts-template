<template>
    <div class="base-format-money" :style="customStyle">
        <span class="money-symbol">¥</span>
        <span class="money-inter" :style="interStyle">{{ inter }}</span>
        <span class="money-decimal">.{{ decimal }}</span>
        <span v-if="lineValue" class="line" :style="lineStyle">¥ {{ lineValue }}</span>
    </div>
</template>

<script setup lang="ts" name="TheFormatMoney">
import floatHelper from "@/utils/helper/float";
import getRealPx from "@/utils/tools/get-realpx";
const props = defineProps({
    /**金额*/
    value: {
        type: [Number, String],
        default: ""
    },
    /**基础字体大小,一般适用符号,小数点,小数位*/
    size: {
        type: Number,
        default: 24
    },
    /**整数字体大小*/
    interSize: {
        type: Number,
        default: 32
    },
    /**划线价*/
    lineValue: {
        type: [Number, String],
        default: ""
    },
    /**划线价字体大小*/
    lineSize: {
        type: Number,
        default: 20
    },
    /**划线价颜色*/
    lineColor: {
        type: String,
        default: "#999999"
    },
    /**价格颜色*/
    color: {
        type: String,
        default: "#fb2010"
    }
});

/**整数*/
let inter = ref("0");
/**小数*/
let decimal = ref("00");

watch(
    () => props.value,
    () => {
        const num = Number(props.value);
        if (isNaN(num)) {
            console.error("格式化金额出错,金额是NaN:", props.value);
            return;
        }
        const str = floatHelper.fix(num, 2);
        const strArr = str.split(".");
        inter.value = strArr[0];
        decimal.value = strArr[1];
    },
    {
        immediate: true
    }
);

const customStyle = computed(() => {
    return {
        fontSize: `${getRealPx(props.size)}px`
    };
});

const interStyle = computed(() => {
    return {
        fontSize: `${getRealPx(props.interSize)}px`
    };
});

const lineStyle = computed(() => {
    return {
        fontSize: `${getRealPx(props.lineSize)}px`
    };
});
</script>

<style lang="scss" scoped>
.base-format-money {
    display: inline-flex;
    align-items: baseline;
    font-weight: 600;
    color: v-bind("props.color");
    span {
        display: inline-block;
        vertical-align: bottom;
        line-height: 1;
    }
    .line {
        margin-left: 13px;
        font-weight: 400;
        text-decoration: line-through;
        color: v-bind("props.lineColor");
    }
}
</style>
