<template>
    <div
        class="frame-view top-safe-area"
        :class="[showTabbar ? '' : 'bottom-safe-area']"
        :style="{ backgroundColor: backgroundColor }"
    >
        <!-- 兼容安卓头部用的空标签  -->
        <div :style="{ height: `${getSafeAreaTop}px`, width: '100vw' }"></div>
        <!-- 头部导航  -->
        <div v-if="showNavbar" class="frame-view-header">
            <div class="frame-view-header__left"><slot name="nav-left"></slot></div>
            <div class="frame-view-header__title">{{ title }}</div>
            <div class="frame-view-header__left"><slot name="nav-right"></slot></div>
        </div>
        <!-- 内容区域 -->
        <div class="frame-view-content">
            <template v-if="!error">
                <base-loading :loading="loading" class="frame-view-loading">
                    <slot></slot>
                </base-loading>
                <!-- 底部插槽   :class="[footerBottom ? 'base-footer-bottom' : '']" -->
                <div v-if="$slots.footer" class="base-footer" :style="bottomStyle">
                    <slot name="footer"></slot>
                </div>
            </template>
            <!-- 错误状态 -->
            <template v-else>
                <base-empty :image="image" :type="type" :desc="desc"></base-empty>
            </template>
        </div>
        <!-- 底部tabbar -->
        <frame-tabbar v-if="showTabbar" class="frame-view-tabbar"></frame-tabbar>
    </div>
</template>

<script lang="ts" setup name="FrameView">
import uaHelper from "@/utils/helper/ua";
import getRealPx from "@/utils/tools/get-realpx";

const props = defineProps({
    /** 加载状态 */
    loading: {
        type: Boolean,
        default: false
    },
    /** 错误状态*/
    error: {
        type: Boolean,
        default: false
    },
    /** 空状态预定义类型 【注：仅当 error 设置为 true 的时候有效】*/
    type: {
        type: String,
        default: "result"
    },
    /** 空状态自定义图片，同vant-empty接收的image */
    image: {
        type: String,
        default: ""
    },
    /** 空状态自定义描述  【注：仅当 error 设置为 true 的时候有效】 */
    desc: {
        type: String,
        default: ""
    },
    /** 是否显示tabbar */
    tabbar: {
        type: Boolean,
        default: false
    },
    /** 头部title */
    title: {
        type: String,
        default: ""
    },
    /** 自定义背景色 */
    backgroundColor: {
        type: String,
        default: "#f4f5f6"
    },
    /** 底部绝对定位值*/
    footerBottom: {
        type: Number,
        default: 0
    }
});

/** 获取顶部安全距离，针对APP场景*/
const getSafeAreaTop = computed(() => {
    if (uaHelper.inApp) {
        return 100;
    }
    return 0;
});
/** 计算是否需要显示navbar */
const showNavbar = ref(uaHelper.inApp);
/** 计算是否需要显示tabbar */
const showTabbar = computed(() => {
    if (uaHelper.inApp) {
        return false;
    }
    return props.tabbar;
});
const bottomStyle = reactive({
    bottom: getRealPx(props.footerBottom || 0) + "px"
});
</script>
<style lang="scss" scoped>
.frame-view {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 100%;
    height: 100%;
    .frame-view-header {
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        width: 100%;
        font-weight: 700;
        z-index: 48;
        font-size: 30px;
    }
    .frame-view-content {
        width: 100%;
        // -webkit-overflow-scrolling: touch;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        ::-webkit-scrollbar {
            display: none;
        }
        .frame-view-loading {
            height: 100%;
        }
    }
    .frame-view-tabbar.van-tabbar {
        min-height: 100px;
    }
    .base-footer {
        box-sizing: content-box;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fff;
        width: 100vw;
        height: 100px;
        font-size: 26px;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
    .base-footer-bottom {
        position: fixed;
        bottom: 100px;
        left: 0;
    }
}
.top-safe-area {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
}
.bottom-safe-area {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
</style>
