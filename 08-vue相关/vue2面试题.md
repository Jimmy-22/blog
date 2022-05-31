### computed 和 watch 的区别

1. computed 用于计算产生新的数据，watch 用于监听现有数据
2. computed 有缓存(依赖的不变，就不会重新计算),method 无缓存

### vue2 的组件通信方式有哪些？

1. 父子组件：使用 props 和事件进行通信
2. 爷孙组件：a.使用 2 次父子组件间通信来实现 b.provide+inject
3. 任意组件：使用 eventBus = new Vue()来通信，主要 API 是 eventBus.$on和eventBus.$emit。缺点是事件多了很乱难以维护
4. 任意组件：Vuex

### Vuex 怎么理解？

Vuex 是一个专门为 Vue.js 应用程序开发的状态管理库
说出核心概念的名字和作用：store/State/Getter/Mutation/Action/Module

1. store 是个大容器，包含以下所有内容
2. State 用来读取状态，带有一个 mapState 辅助函数
3. Getter 用来读取派生状态，带有一个 mapGetters 辅助函数
4. Mutation 用于同步提交状态变更，带有一个 mapMutations 辅助函数
5. Action 用于异步变更状态，但它提交的是 Mutation，而不是直接变更状态
6. Module 用来给 store 划分模块，方便维护代码
   (Pinia 把 Mutation 和 Action 合并了)

### VueRouter 怎么理解？

VueRouter 是 Vue.js 的官方路由，与 Vue.js 核心深度集成，让用 Vue.js 构建单页面应用变得简单

说出核心概念的名字和作用：router-link，router-view，嵌套路由，Hash 模式和 History 模式，导航守卫，懒加载

#### Hash 模式和 History 模式区别?

1. 一个 hash，一个用的 history API
2. history 需要后端 nginx 配合，hash 不需要

#### 导航守卫如何实现登录控制？

### Vue 双向绑定的原理和实现

1. 一般使用 v-model 实现，v-model 是 v-bind:value 和 v-on:input 的语法糖
2. 前者实现 data->UI 的单项绑定，后者实现了 UI->data 的单项绑定
3. 加起来就是双向绑定了

#### 上述两个单项绑定是如何实现的？

1. 前者通过 Object.defineProperty 给 data 创建 getter 个 setter，用于监听 data 的改变，data 一变就会安排改变 UI
2. 后者通过 template compiler 给 DOM 添加事件监听，DOM input 的值改变了就会去修改 data

### Vue中给对象添加新属性时，界面不刷新怎么办？

1. 直接添加属性的问题

   一个例子，定义一个`p`标签，通过`v-for`遍历，然后给`botton`标签绑定点击事件，我们预期点击按钮时，数据新增一个属性，界面也新增一行

   ```vue
   <p v-for="(value,key) in item" :key="key">
       {{value}}
   </p>
   <button @click="addProperty">动态添加新属性</button>
   ```

   实例化一个vue实例

   ```js
   const app = new Vue({
   	el:'#app',
   	data() {
   		return {
   			item:{ oldProperty:"旧属性" }
   		}
   	},
   	methods: {
   		addProperty() {
   			this.item.newProperty = '新属性'
   			console.log(this.items) 
   		}
   	}
   })
   ```

   点击按钮，发现数据虽然更新了（`console`打印出了新属性），但页面并没有更新

2. 原理分析

   `vue2`是用过`Object.defineProperty`实现数据响应式

   ```js
   const obj = {}
   Object.defineProperty(obj, 'foo', {
       get(val) {
           console.log(`get foo:${val}`)
           return val
       },
       set(newVal,val) {
           if (newVal !== val) {
               console.log(`set foo:${newVal}`);
               val = newVal
           }
       }
   })
   
   // 当我们访问foo属性或者设置foo值的时候都能够触发setter与getter
   obj.foo
   obj.foo = 'new'
   // 但是我们为`obj`添加新属性的时候，却无法触发事件属性的拦截
   obj.bar = '新属性'
   ```

   原因是一开始`obj`的`foo`属性被设成了响应式数据，而`bar`是后面新增的属性，并没有通过`Object.defineProperty`设置成响应式数据

3. 解决方案

   `Vue` 不允许在已经创建的实例上动态添加新的响应式属性，若想实现数据与视图同步更新，可采取下面三种解决方案：

   **Vue.set()**

   Vue.set( target, propertyName/index, value )

   参数：

   - `{Object | Array} target`
   - `{string | number} propertyName/index`
   - `{any} value`

   返回值：设置的值

   通过`Vue.set`向响应式对象中添加一个`property`，并确保这个新 `property `同样是响应式的，且触发视图更新

   **Object.assign()**

   直接使用`Object.assign()`添加到对象的新属性不会触发更新。应创建一个新的对象，合并原对象和混入对象的属性

   ```js
   this.someObject = Object.assign({},this.someObject,{newPro1:1,newPro2})
   ```

   ### 小结

   - 如果为对象添加少量的新属性，可以直接采用`Vue.set()`
   - 如果需要为新对象添加大量的新属性，则通过`Object.assign()`创建新对象
   - 万不得已，可采取`$forceUpdate()`进行强制刷新 

   PS：`vue3`是用过`proxy`实现数据响应式的，直接动态添加新属性仍可以实现数据响应式

   

