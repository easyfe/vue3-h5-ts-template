## 页面显示状态监听

监听页面显示状态

### 场景

用于页面隐藏、显示后，需要对数据进行操作的情况。

例如H5跳转小程序之后，在小程序完成了业务逻辑，返回到H5的时候，需要对业务状态进行更新。

### 用法

```javascript
<base-page-visible @visible="show" @hidden="hidden"></base-page-visible>

show(){
    do something
}

hidde(){
    do something
}
```

### API

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| :--- | ---- | ---- | ------ |
| -    | -    | *-*  | -      |

#### Events

| 事件名  | 说明         | 回调参数 |
| ------- | ------------ | -------- |
| visible | 触发页面显示 | -        |
| hidden  | 触发页面隐藏 | -        |