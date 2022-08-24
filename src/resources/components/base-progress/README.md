### 组件名称：进度条组件

### 场景

### API

#### Props

| 参数             | 说明                                                                        | 类型           | 默认值     |
| ---------------- | --------------------------------------------------------------------------- | -------------- | ---------- |
| strokeWidth      | 进度条宽度(传入设计稿标注大小(iphone6 为标准)) 单位:px                      | Number, String | 父容器宽度 |
| strokeHidth      | 进度条高度(传入设计稿标注大小(iphone6 为标准)) 单位:px                      | Number, String | 40px       |
| color            | 进度条颜色，可传渐变 如 color="linear-gradient(to right, #be99ff, #7232dd)" | String         | #1989fa    |
| trackColor       | 轨道颜色                                                                    | String         | #eeeeee    |
| trackBorderColor | 轨道边框颜色                                                                | String         | red        |
| textColor        | 进度文字颜色                                                                | String         | #000000    |
| coverTextColor   | 覆盖进度条上面文字颜色                                                      | String         | white      |
| textPosition     | 进度文字位置 可选值 【left、 right 、center】                               | String         | center     |
| percentage       | 进度百分比，注：值有效范围【max:100,min:0】                                 | Number, String | 50         |
| pivotText        | 进度文字内容                                                                | String         | 百分比     |

#### Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |

#### Slots

| 名称  | 说明                   |
| ----- | ---------------------- |
| other | 自定义上方区域，如标题 |

#### 用法

```html
<template>
    <div id="BaseProgress" class="base-progress">
        <!-- 插槽 -->
        <slot name="other" class="other"></slot>
        <!-- 进度条 CONTENT -->
        <div
            class="progress-box"
            :style="{
                width: strokeWidth ? getRealPx(strokeWidth) : '100%',
                height: getRealPx(strokeHidth),
                borderRadius: getRealPx(Number(strokeHidth) / 2)
            }"
        >
            <div
                class="progress"
                :style="{
                    borderWidth: '1px',
                    borderColor: trackBorderColor,
                    lineHeight: getRealPx(strokeHidth),
                    borderRadius: getRealPx(Number(strokeHidth) / 2)
                }"
            >
                <div
                    class="progress-1"
                    :style="{
                        color: textColor,
                        textAlign: textPosition,
                        background: trackColor
                    }"
                >
                    {{ pivotText ? pivotText : Number(percentage / 100) * 100 + " %" }}
                </div>
                <div
                    class="progress-2"
                    :style="{
                        background: color,
                        left: '-' + Number(100 - percentage) + '%',
                        borderRadius: getRealPx(Number(strokeHidth) / 2)
                    }"
                >
                    <div
                        class="progress-2-inner"
                        :style="{
                            color: coverTextColor,
                            textAlign: textPosition,
                            left: Number(100 - percentage) + '%'
                        }"
                    >
                        {{ pivotText ? pivotText : Number(percentage / 100) * 100 + " %" }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
```

```ts
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import BaseProgress from "@/resources/components/base-progress/index.vue";
import getRealPx from "@/utils/tools/get-realpx/index";
@Component({
    name: "Progress",
    components: {
        BaseProgress
    }
})
export default class Progress extends Vue {
    // w = 670;
    // mounted(): void {
    //     setTimeout(() => {
    //         this.w = 500;
    //         console.log(333);
    //         (this.$refs["progress"] as any).resize();
    //     }, 5000);
    // }
    getRealPx(px: number): string {
        return getRealPx(px) + "px";
    }
}
</script>
```

```scss
<style lang="scss" scoped>
.progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 50px 0px;
    h1 {
        font-size: 36px;
        padding: 0 20px;
    }
    &-bar {
        font-size: 24px;
        .other-content {
            margin: 0 auto;
            padding: 20px 0;
        }
    }
}
</style>
```
