### 什么是keep-alive

日常开发中，有部分组件没有必要多次初始化。此时，需要将组件进行持久化，使组件状态维持不变。

`<keep-alive>`是Vue一个内置的组件，可以使被包含的组件保留状态，避免重新渲染，也就是组件缓存。能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

### include和exclude指定是否缓存某些组件

- include属性

  include的值为字符串或正则表达式或数组。只有组件的名称与include的值相同的才会被缓存，即指定哪些被缓存，可多个。

  ```vue
  <keep-alive include="home,about">
      <router-view></router-view>
  </keep-alive>
  ```

- exclude

  用法相反



### 使用keep-alive的钩子函数执行顺序问题

首先使用了keep-alive的组件以后，组件上就会自动加上了`activated`钩子和`deactivated`钩子。

```
初始进入和离开 created ---> mounted ---> activated --> deactivated
后续进入和离开 activated --> deactivated
```

### keep-alive的应用场景举例

- 查看表格某条数据详情页，返回还是之前的状态，比如还是之前的筛选结果，还是之前的页数等
- 填写的表单的内容路由跳转返回还在，比如input框、下选择拉框、开关切换等用户输入了一大把东西，跳转再回来不能清空，不用让用户再写一遍

### KeepAlive组件实现原理

- 组件的激活与失活

在HTTP协议中，`KeepAlive`又称**HTTP持久连接**，其作用是允许多个请求或响应共用一个TCP连接。
`KeepAlive`的本质是缓存管理，再加上特殊的挂载/卸载逻辑。`KeepAlive`的实现需要渲染器层面的支持，因为被`KeepAlive`的组件在卸载时，不能真的将其卸载。二是将被`KeepAlive`的组件从原容器搬运到另外一个隐藏的容器中，实现假卸载。当隐藏容器中的组件需要再次被挂载时，也不能执行真正的挂载逻辑，而是应该把该组件从隐藏容器中搬运到原容器。这个过程对应到组件的生命周期，其实就是activated和deactivated。

一个基本的`KeepAlive`组件实现过程如下：

```js
const keepAlive = {
  // KeepAlive组件独有的属性，用作标识
  __isKeepAlive: true,
  setup(props, { slots }) {
    // 创建一个缓存对象
    // key: vnode.type
    // value: vnode
    const cache = new Map()
    // 当前keepAlive组件的实例
    const instance = currentInstance
    const { move, creatElement } = instance.keepAliveCtx
    const storageContainer = creatElement('div)
    instance._deActivate = (vnode) => {
      move(vnode, storageContainer)
    }
    instance._activate = (vnode, container, anchor) {
      move(vnode, container, anchor)
    }

    return () => {
      let rawVNode = slot.default()
    }
  }
}
```




