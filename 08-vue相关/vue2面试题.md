### computed和watch的区别

1. computed用于计算产生新的数据，watch用于监听现有数据
2. computed有缓存(依赖的不变，就不会重新计算),method无缓存

### vue2的组件通信方式有哪些？

1. 父子组件：使用props和事件进行通信
2. 爷孙组件：a.使用2次父子组件间通信来实现 b.provide+inject
3. 任意组件：使用eventBus = new Vue()来通信，主要API是eventBus.$on和eventBus.$emit。缺点是事件多了很乱难以维护
4. 任意组件：Vuex

### Vuex怎么理解？

Vuex是一个专门为Vue.js应用程序开发的状态管理库
说出核心概念的名字和作用：store/State/Getter/Mutation/Action/Module
1. store是个大容器，包含以下所有内容
2. State用来读取状态，带有一个mapState辅助函数
3. Getter用来读取派生状态，带有一个mapGetters辅助函数
4. Mutation用于同步提交状态变更，带有一个mapMutations辅助函数
5. Action用于异步变更状态，但它提交的是Mutation，而不是直接变更状态
6. Module用来给store划分模块，方便维护代码
 (Pinia把Mutation和Action合并了)

### VueRouter怎么理解？

VueRouter是Vue.js的官方路由，与Vue.js核心深度集成，让用Vue.js构建单页面应用变得简单

说出核心概念的名字和作用：router-link，router-view，嵌套路由，Hash模式和History模式，导航守卫，懒加载

#### Hash模式和History模式区别?

1. 一个hash，一个用的history API
2. history需要后端nginx配合，hash不需要

#### 导航守卫如何实现登录控制？

### Vue双向绑定的原理和实现

1. 一般使用v-model实现，v-model是v-bind:value和v-on:input的语法糖
2. 前者实现data->UI的单项绑定，后者实现了UI->data的单项绑定
3. 加起来就是双向绑定了

#### 上述两个单项绑定是如何实现的？

1. 前者通过Object.defineProperty给data创建getter个setter，用于监听data的改变，data一变就会安排改变UI
2. 后者通过template compiler给DOM添加事件监听，DOM input的值改变了就会去修改data 