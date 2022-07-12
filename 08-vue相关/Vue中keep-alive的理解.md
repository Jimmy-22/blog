### 什么是keep-alive

日常开发中，有部分组件没有必要多次初始化。此时，需要将组件进行持久化，使组件状态维持不变，在下次展示时，也不会进行重新初始化组件。

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