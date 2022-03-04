## vue生命周期

### beforeCreate

1. 创建一个空白的vue实例
2. data，method尚未被初始化，不能使用

### created

1. vue实例（JS对象）初始化完成，完成响应式绑定
2. data,method都已经初始化完成
3. 尚未开始渲染模板（因此先不要操作和dom相关的）

### beforeMount

1. 编译模板，调用render生成vdom
2. 还没有开始渲染DOM

### mounted

1. 完成DOM渲染（vdom->DOM）
2. 组件创建完成
3. 开始由创建阶段进入运行阶段

### beforeUpdate

1. data发生变化之后
2. 准备更新DOM（尚未更新dom）

### updated

1. data发生变化，且DOM更新完成
2. 注意：不要在updated中修改data,可能导致死循环

### beforeUnmount

1. 组件进入销毁阶段（尚未销毁，可以正常使用）
2. 可移除，解绑一些全局事件，自定义事件

### unmounted

1. 组件被销毁了
2. 所有子组件也都被销毁了

### vue中什么时候操作DOM比较合适？

mounted和updated都不能保证子组件全部挂载完成。可使用$nextTick渲染DOM

```js
mounted() {
  this.$nextTick(()=>{
    // 在整个视图都被渲染之后，才会运行的代码
  })
}
```

### Ajax应该放在哪个生命周期？

mounted中更好。created->mounted(vdom计算，dom渲染，ms级非常快)

### vue3生命周期的区别？

1. 使用setup代替了beforeCreate和created
2. 使用Hooks函数的形式，如mounted改成onMounted()

