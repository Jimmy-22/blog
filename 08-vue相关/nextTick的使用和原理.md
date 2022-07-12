### nextTick是什么

定义：在下次`DOM`更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的`DOM`。因为`Vue`在更新`DOM`时候是异步执行的。当数据发生变化，`Vue`将开启一个异步更新队列，视图需要等队列中的所有数据变化完成后，再统一进行更新

```vue
<div id="app">{{ message }}</div>
```

构建一个`Vue`实例

```js
const vm = new Vue({
  el:'#app',
  data:{
	message:"原始值"
  }
})
```

修改message

```js
this.message = '修改后的值1'
this.message = '修改后的值2'
this.message = '修改后的值3'
```

此时想获取页面最新的`DOM`节点，却发现获取到的是旧值

```js
console.log(vm.$el.textContent) // 原始值
```

这是因为`message`数据在发现变化的时候，`vue`并不会立刻去更新`Dom`，而是将修改数据的操作放在了一个异步队列中，如果我们一直修改相同数据，异步操作队列还会进行去重。等待同一事件循环中的所有数据变化完成之后，会将队列中的事件拿来进行处理，进行`DOM`的更新

#### 为什么要有nextTick

```js
{{ num }}
for (let i=0;i<100000;i++){
    num = i
}
```

如果没有 `nextTick` 更新机制，那么 `num` 每次更新值都会触发视图更新(上面这段代码也就是会更新10万次视图)，有了`nextTick`机制，只需要更新一次，所以`nextTick`本质是一种优化策略

### 使用场景

如果想要在修改数据后立刻得到更新后的`DOM`结构，可以使用`Vue.nextTick()`

第一个参数为：回调函数（可以获取最近的`DOM`结构）

第二个参数为：执行函数上下文

```js
// 修改数据
vm.message = '修改后的值'
// DOM还没有更新
console.log(vm.$el.textContent) // 原始的值
Vue.nextTick(function(){
  // DOM更新了
  console.log(vm.$el.textContent) // 修改后的值
})
```

 组件内使用vm.$nextTick方法只需要通过this.$nextTick()，并且回调函数中的`this` 将自动绑定到当前的 `Vue` 实例上

```js
this.message = '修改后的值'
console.log(this.$el.textContent) // => '原始的值'
this.$nextTick(function(){
   console.log(vm.$el.textContent) // 修改后的值
})
```

`$nextTick()`会返回一个`Promise`对象，可以是用`async/await`完成相同作用的事情

```JS
this.message = '修改后的值'
console.log(this.$el.textContent) // => '原始的值'
await this.$nextTick()
console.log(this.$el.textContent) // => '修改后的值'
```





