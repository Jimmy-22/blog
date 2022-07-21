### 文本插值
vue里文本插值默认是用双大括号
```css
<h1>{{ message }}</h1>
```
而在JSX中变成了单大括号
```jsx
const name = 'Messi'
const element = <h1>Hi, { name }</h1>
```
和Vue模板语法中的文本插值一样，大括号内支持任何有效的JavaScript 表达式
### 条件渲染
jsx本身也是一个条件表达式，不再需要使用`v-if`指令。
- 使用if/else
```js
const element = (name) => {
  if (name) {
    return <h1>Hi, { name }</h1>
  } else {
    return <div>'ok'</div>
  }
}
```
- 使用三元运算符
```jsx
const element = icon ? <span class="icon"></span> : null
```
### 列表渲染
列表渲染直接使用map，代替`v-for`指令
```js
const data = [{ id: 1, title: '买菜' }, { id: 1, title: '购物' }]
const element = data.map(item => {
  return <div>{ item.title }</div>
})
```
### 标签属性绑定
属性绑定也是使用大括号包裹，代替`v-bind`
```js
const href = 'http://www.baidu.com/'
const element = <a href={href}>football</a>
```
### class类名绑定
直接使用JS模板字符串即可
```css
const element = <div className={`abc-title ${disabled? 'disabled' : ''}`}></div>
```
也可以使用数组：
```css
const element = <div class={['xxx-title', disabled && 'disabled']}>Item</div>
```
### style样式绑定
样式绑定需要使用双大括号
```jsx
const width = '100px'
const element = <button style={{ width, fontSize: '16px' }}></button>
```
### 时间绑定
绑定事件也是用大括号，注意事件名前面要加上`on`前缀，比如click事件要写成`onClick`，mouseenter事件要写成`onMouseenter`
```jsx
const confirm = () => {
  // xxxx 
}
<button onClick={confirm}></button>
```
如果要带参数，需要使用箭头函数进行包裹：
```jsx
const confirm = (name) => {
  // xxxx 
}
<button onClick={() => confirm('messi')}></button>
```
### 事件修饰符
jsx中给事件增加修饰符需要借助`withModifiers`方法
```js
import { withModifiers, defineComponent, ref } from 'vue'
const App = defineComponent({
 setup() {
   const count = ref(0)
   const plus = () => {
     count.value++
   }
   return () => {
     <div onClick={ withModifiers(plus, ['self']) }>{ count.value }</div>
   }
 }
})
```
### v-model双向绑定
- 绑定`modelValue`
这种情况比较简单，JSX写法：
```vue
<overlay v-model={ menuShow.value }></overlay>
```
`SFC`写法：
```vue
<overlay v-model="menuShow"></overlay>
```
- 绑定自定义名称
比如绑定`visible`，JSX中不能直接用`v-model:visible`的语法，需要传入一个数组`[menuShow.value, 'visible']`，数组的第二个参数就是要绑定的自定义名称
```jsx
<overlay v-model={[menu.value, 'visible']}></overlay>
```
`SFC`写法：
```vue
<overlay v-model:visible="menuShow"></overlay>
```
### slot插槽
jsx中没有`<slot>`标签，定义插槽需要使用双大括号
如果是具名插槽，则将`default`改成具名插槽的名称，比如`mySlot`，则使用`ctx.slots.mySlot?.()`

插槽从setup的第二个参数`ctx`中获取，不需要加`$`前缀
```js
import { defineComponent } from 'vue'
export default defineComponent({
  setup(props, { slots }) {
    return () => {
      return <button>{ slots.default?.() }</button>
    }
  }
})
```
还可以使用`renderSlot`方法：
```js
import { renderSlot } from 'vue'

<button>
  { renderSlot(slots, 'default') }
</button>
```
### Scoped Slots作用域插槽
使用作用域插槽可以实现插槽传参，以下是具体的示例
`JSX`和`SFC`中插槽使用的写法对比
`JSX`写法：
```tsx
<d-tree data={data}>
  {{
    mySlot: (item) => (item.open ? <IconOpen /> : <IconClose />)
  }}
</d-tree>
```
还可以通过`v-slots`的方式使用：
```tsx
<d-tree data={data} v-slots={{ 
  mySlot: (item) => (item.open ? <IconOpen /> : <IconClose />) 
}}>
</d-tree>
```
`SFC`写法：
```vue 
<d-tree :data="data"> 
  <template #mySlot="item">
    <IconOpen v-if="item.open" />
    <IconClose v-else /> 
  </template> 
</d-tree>
```
其中的`item`是插槽的参数，通过
```tsx
ctx.slots.mySlot(item)
```
的方式给插槽传入参数

或者使用`renderSlot`方法，第三个参数就是要传给插槽的参数：
```tsx
import { renderSlot, useSlots } from 'vue' 
<button> 
  { renderSlot(useSlots(), 'mySlot', item) } 
</button>
```
### class绑定
使用`CSS Modules`，引入局部样式，相当于SFC中的`scoped`
```js
import s from './index.module.scss'
<div class={s.wrapper}></div>
```
### 属性绑定
```tsx
const properties = {a: 1, b: 2}
```
SFC中`<div v-bind="properties"></div>`批量绑定标签属性。

在JSX中的替换方案是`<div {...properties}></div>`