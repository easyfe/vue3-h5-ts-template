### 组件名称：面板组件

### 用法简介 该组件采用对象的方式传入参数 组件分为 header 和 columns 2 个部分，可根据需要使用

### Prop

#### wrapperClass 用于修改外层 warpper 组件的默认样式

    | 参数        | 说明    |  类型  |
    | --------   | -----:   | :----: |
    | wrapperClass        | 支持自定义样式     |   object   |

#### header 区域的参数

    | 参数        | 说明    |  类型  |
    | --------   | -----:   | :----: |
    | title        | header的标题      |   string   |
    | icon        | icon图标需传入对象(具体内容见下)      |   object    |
    | tip        | 额外的说明文字      |   string    |

#### icon 图标参数

    | 参数        | 说明    |  类型  |
    | --------   | -----:   | :----: |
    | url        | icon图标路径     |   string   |
    | width        | 宽度      |   sting | number    |
    | height        | 高度      |   sting | number    |

#### columns 区域的参数

    | 参数        | 说明    |  类型  |
    | --------   | -----:   | :----: |
    | label        | 左边的文字     |   string   |
    | labelClass        | 支持自定义左边的文字样式     |   object   |
    | value        | 右边的文字      |   sting     |
    | valueClass        | 支持自定义右边边的文字样式     |   object   |
    | longValue        | 当右边需要显示收货地址这种长文字的时候，需要传入此参数     |   boolean   |
    | height        |  行的高度(默认是80)      |   sting | number    |
    | isPhone        | 有些情况右边需要显示一个打电话的图标，点击可以打电话，需要传入此参数，此时value值就是电话号码      |   boolean     |
    | icon        | icon图标需传入对象(和上面一样)      |   object     |
    | button        | 右边按钮的文字      |   string     |
    | buttonClass        | 右边按钮的文字的样式      |   object     |
    | buttonCallBack        | 点击button需要触发的事件      |   function     |

### 组件传参的参考示例 (页面 demo 路径 http://192.168.28.250:16000/h5/dev/cell)

```ts
cellConfig = {
    header: {
        title: "收货人",
        icon: {
            url: require("@/assets/images/base/user-phone@2x.png"),
            width: 16,
            height: 16
        },
        tip: "(最多6个字)"
    },
    columns: [
        {
            label: "收货人电话",
            value: "15156066843",
            isPhone: true,
            height: 50,
            icon: {
                url: require("@/assets/images/base/user-phone@2x.png"),
                width: 16,
                height: 16
            },
            buttonClass: {
                color: "red"
            },
            buttonCallBack: function (): void {
                alert(1);
            }
        },
        {
            label: "订单编号",
            value: "张三",
            labelClass: {
                color: "red"
            },
            valueClass: {
                color: "red"
            }
        },
        {
            label: "代理等级",
            tag: "联创"
        },
        {
            label: "留言",
            button: "查看",
            buttonCallBack: function (): void {
                alert("查看");
            }
        },
        {
            label: "收货地址",
            value: "这是张三的收货地址巴拉巴卡巴拉撒大声地",
            longValue: true
        }
    ]
};
```
