<template>
    <div id="BaseCollapse" class="base-collapse">
        <div class="base-collapse-item">
            <!-- title -->
            <div class="title">
                <slot v-if="$slots['title-content']" name="title-content" :row="data"></slot>
            </div>
            <!-- 开启折叠模式 -->
            <template v-if="accordion">
                <!-- 折叠面板中的内容 -->
                <div v-show="isOpen" :class="[{ border: border }, 'collapse-item__content']">
                    <slot v-if="$slots['collapse-content']" name="collapse-content" :row="data"></slot>
                </div>
                <!-- 折叠开关 -->
                <div class="fold-switch">
                    <div :class="round ? 'fold-switch-round' : 'fold-switch-plain'" @click.stop="state_change">
                        <!-- 自定义开关 -->
                        <slot v-if="$slots['switch-text']" name="switch-text" :row="data"></slot>
                        <!-- 默认开关 -->
                        <template v-else>
                            <span class="btn-text">
                                {{ isOpen ? putButtonText : openButtonText }}
                            </span>
                            <van-icon
                                v-if="showButtonIcon"
                                :name="isOpen ? 'arrow-up' : 'arrow-down'"
                                :color="iconColor"
                            />
                        </template>
                    </div>
                </div>
            </template>
            <!-- 不开启折叠模式 -->
            <template v-else>
                <div :class="[{ border: border }, 'collapse-item__content']">
                    <slot name="collapse-content"></slot>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    /**
     * @param {boolean}  是否显示头部和内容区域的 分割线
     */
    border: {
        type: Boolean,
        default: true
    },
    /**
     * @param {boolean}  初始设置面板展开折叠状态
     *  也可ref 可以获取到 当前组件 实例并调用实例方法 toggle ，切换面试展开状态，传 true 为展开，false 为收起，不传参为切换；
     * 注意：组件挂载后才能访问到 ref 对象
     */
    initOpen: {
        type: Boolean,
        default: false
    },
    /**
     * @param {boolean}  是否开启折叠模式
     */
    accordion: {
        type: Boolean,
        default: true
    },
    /**
     * @param {string}  展开时按钮文案
     */
    openButtonText: {
        type: String,
        default: "展开"
    },
    /**
     * @param {string}  收起时按钮文案
     */
    putButtonText: {
        type: String,
        default: "收起"
    },
    /**
     * @param {boolean}  是否为圆形按钮
     */
    round: {
        type: [Boolean],
        default: true
    },
    /**
     * @param {boolean}  是否显示按钮icon
     */
    showButtonIcon: {
        type: [Boolean],
        default: true
    },
    /**
     * @param {string}  是否为圆形按钮
     */
    iconColor: {
        type: [String],
        default: "#999999"
    }
});

let isOpen = ref(props.initOpen);
let initConHeight = ref(0);
let data = reactive({
    isOpen: false
});
const emits = defineEmits<{
    (e: "change", status: boolean): void;
}>();

const state_change = (): void => {
    isOpen.value = !isOpen.value;
    data.isOpen = isOpen.value;
    /**
     *  面板状态变更时触发
     * @returns  {boolean}  【true代表面板展开状态 ，false代表面板收起状态】
     */
    emits("change", isOpen.value);
};

/**
 * 初始设置面板展开折叠状态
 * @param {boolean} o  传 true 为展开，false 为收起，不传参为切换；
 */
const toggle = (o: boolean): boolean => {
    if (Object.prototype.toString.call(o) === "[object Boolean]") {
        isOpen.value = o;
        data.isOpen = o;
    } else if (Object.prototype.toString.call(o) === "[object Undefined]") {
        isOpen.value = !isOpen.value;
        data.isOpen = isOpen.value;
        // this.setCollapseHit(this.$el); //设置展开动画
        /**
         *  面板状态变更时触发
         * @returns  {boolean}  【true代表面板展开状态 ，false代表面板收起状态】
         */
        emits("change", isOpen.value);
    }
    return false;
};
defineExpose({
    toggle
});
/**
 * 动态设置折叠面板内容区高度
 * @param {any} el 当前vue实例
 */
const setCollapseHit = (el: any): void => {
    const _el = el.childNodes && el.childNodes.length && el.childNodes[0].childNodes;
    const DOMLIST = Array.from(_el);
    let _DOM: any = DOMLIST.filter((el: any): any => {
        if (el.getAttribute("class") && -1 < el.getAttribute("class").indexOf("collapse-item__content")) {
            return el;
        }
    });
    nextTick(() => {
        let height = _DOM[0].offsetHeight;
        if (isOpen.value) {
            // 展开
            _DOM[0].style.height = "auto";
            height = _DOM[0].offsetHeight;
            _DOM[0].style.height = initConHeight.value + "px";
            _DOM[0].style.height = height + "px";
        } else {
            // 收缩
            _DOM[0].style.height = height + "px";
            _DOM[0].style.height = initConHeight.value + "px";
        }
    });
};
</script>

<style lang="scss" scoped>
.base-collapse {
    font-size: 26px;
    &-item {
        width: 100%;
        background: #ffffff;
        border-radius: 8px;
        margin: 0 auto;
        .title {
            padding: 20px 32px;
        }
        .collapse-item__content {
            overflow: hidden;
            padding: 20px 32px;
            transition: height 0.3s ease-in-out;
            will-change: height;
            &.border {
                border-top: 1px solid #f8f8f8;
            }
        }
        .fold-switch {
            width: 100%;
            display: flex;
            padding: 20px 32px;
            .btn-text {
                color: #333333;
                margin-right: 5px;
            }
            &-plain {
                display: flex;
                align-items: center;
                margin: 0 auto;
                font-size: 24px;
                font-weight: 400;
                color: #1592ff;
                line-height: 24px;
            }
            &-round {
                padding: 5px 20px;
                height: 50px;
                border: 1px solid #d6d6d6;
                border-radius: 25px;
                display: flex;
                margin: 0 auto;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
