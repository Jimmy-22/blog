### useEffect的使用

`useEffect`函数不涉及到任何类型，TS 和 JS 中使用一致

### useState的使用

`useState`hook是一个泛型函数，接收一个类型变量来指定状态的类型。注意：该类型变量，不仅指定了状态的类型，也指定了 setName 等修改状态函数的参数类型

```js
// 指定 name 状态的类型为：string
const [name, setName] = useState<string>('jack')
const [age, setAge] = useState<string>(28)
```
省略类型变量，简化 useState 的调用：

- 在使用 useState 时，只要提供了初始值，TS 就会自动根据初始值来推断出其类型，因此，可以省略类型变量
- 注意：如果 TS 自动推断出来的类型不准确，还得显式指定泛型类型

### useState明确指定泛型类型

需求：获取列表数据并渲染

```js	
// 比如，频道列表数据是一个数组，所以，在 JS 中我们将其默认值设置为：[]
// 但是，在 TS 中使用时，如果仅仅将默认值设置为空数组，list 的类型被推断为：never[]，此时，无法往数组中添加任何数据
const [list, setList] = useState([]);
```

```js
<ul>
  {list.map(item=>{
   return <li>{item.name}</li>
  })}
</ul>
```









