JS属于动态类型的编程语言，只能在**代码执行期间**做类型的相关检查。而TS属于静态类型的编程语言。代码会先通过编译，然后运行，编译不通过的，自然暴露代码中的问题

### 常用基础类型

可以将TS中的常用基础类型分为两类

1. JavaScript 已有类型
   - 原始类型 `string/number/undefined/null/boolean/symbol`
   - 对象类型 `object`（数组、对象、函数等）
2. TypeScript 新增类型
   - 联合类型、自定义类型（类型别名）、接口、元祖、字面量类型、枚举、void、any

注意：原始类型在 TS 和 JS 中写法一致， 对象类型在 TS 中更加细化，每个具体对象都有自己的类型语法



### TS和JS的区别是什么？有什么优势？

1. 语法层面：Typescript = JavaScript + Type(TS是JS的超集)
2. 执行环境层面： 浏览器、Node.js可以直接执行JS，但不能执行TS(Deno可以执行TS)
3. 编译层面：TS有编译阶段，JS没有编译阶段(只有转译阶段和lint阶段)
4. 编写层面：TS更难写一点，但是类型更安全
5. 文档层面：TS的代码写出来就是文档，IDE可以完美提示。JS的提示主要靠TS

### any/unknow/never的区别是什么？

any V.S unknow
二者都是顶级类型(top type)，任何类型的值都可以赋值给顶级类型变量：

```tsx
let foo: any = 123; // 不报错
let bar: unknown = 123; // 不报错
```

但是 unknown 比 any 的类型检查更严格，any 什么检查都不做，unknown 要求先收窄类型：

```tsx
const value: unknow = 'Hi'
const someString: string = value
// 报错：Type 'unknown' is not assignable to type 'string'.(2322)
```
```tsx
const value: unknow = 'Hi'
const someString = value as string // 不报错
```

如果改成 any，基本在哪都不报错。所以能用 unknown 就优先用 unknown，类型更安全一点

never是底类型，表示不应该出现的类型

```ts
interface A {
   type: 'a'
}
interface B {
   type: 'b'
}
type All = A | B

function handleValue(val: All) {
   switch (val.type) {
      case 'a':
        // 这里 val 被收窄为 A
        break
      case 'b': 
        // val 在这里是 B 
        break 
      default: 
        // val 在这里是 never 
        const exhaustiveCheck: never = val 
        break
   }
}
```


### type和interface的区别是什么？

1. 组合方式：interface使用extends来实现继承，type使用&来实现联合类型
2. 扩展方式：interface可以重复声明用来扩展，type一个类型只能声明一次
3. 范围不同：type适用于基本类型，interface一般不行
4. 命名方式：interface会创建新的类型名，type只是创建类型别名

## TypeScript vs JavaScript

TypeScript 是 "强类型" 版的 JavaScript，当我们在代码中定义变量(包括普通变量、函数、组件、hook等)的时候，TypeScript 允许我们在定义的同时指定其类型，这样使用者在使用不当的时候就会被及时报错提醒

```jsx
interface SearchPanelProps {
  users: User[],
  param: {
    name: string;
    personId: string;
  },
  setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {}
```

经常用 TypeScript 的感受：比起原来的 JavaScript，TypeScript 带来了完全不一样的开发体验，bug 大大减少了，编辑器提示快了，代码更易读了， 开发速度快了(看似多写代码，其实由于前面几点节省了大量开发时间)，上手了就回不去了

## TypeScript 的类型

各种类型： number, string, boolean, 函数, array, any, void, object

### number

数字类型，包含小数、其他进制的数字：

```jsx
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

### string

字符串

```jsx
let color: string = "blue";
```

### array

在 TS 中，array 一般指**所有元素类型相同**的值的集合，比如：

```jsx
let list: Array<number> = [1, 2, 3];

// or

interface User {
  name: string
}
const john = {name: 'john'}
const jack = {name: 'jack'}
let personList = [john, jack] // 这里 john 和 jack 都是 User 类型的
```

和这种混合类型的 "数组"：

```jsx
let l = ['jack', 10]
```

在 TS 中不是 数组/array，它们叫作 tuple，下面会提到

### boolean

布尔值

```jsx
let isDone: boolean = false;
```

### void

绝大部分情况下，只会用在这一个地方：表示函数不返回任何值或者返回undefined (因为函数不返回任何值的时候 === 返回 undefined)

```jsx
/**
 * 上节课写的 useMount
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};
```

### object

除了 number, string, boolean, bigint, symbol, null, or undefined，其他都是 object

### tuple

这就是一个典型的 tuple

```jsx
const [users, setUsers] = useState([])
```

tuple 是"数量固定，类型可以各异" 版的数组

在 React 中有可能使用 tuple 的地方就是 custom hook 的返回值，注意 isHappy → tomIsHappy 以及其他名字的变化，这里使用tuple的好处就显现出来了：便于使用者重命名

```jsx
const useHappy = () => {
   //....
   return [isHappy, makeHappy, makeUnHappy]
}

const SomeComponent = () => {
  const [tomIsHappy, makeTomHappy, makeTomUnHappy] = useHappy(false)
  // ...
}
```

### enum

```jsx
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

### null 和 undefined

null 和 undefined 在 TypeScript 中既是一个值，也是一个类型：

```jsx
let u: undefined = undefined;
let n: null = null;
```

### never

```jsx
// 这个 func返回的就是never类型，用到比较少，在类型操作等场景会用到
const func = () => {
  throw new Error()
}
```

## 什么时候需要声明类型？

理论上来说在声明任何变量的时候都需要声明类型(包括普通变量、函数、组件、hook等等)，声明函数、组件、hook等需要声明参数和返回值的类型。

但是在很多情况下，TS可以帮我们自动推断，我们就不用声明了，比如：

```jsx
// 这里虽然没有显式声明，但是ts自动推断这是个number
let a = 1

// 自动推断返回值为number
function add(a: number, b: number) {
  return a + b;
}

// 自动推断返回值为boolean
const isFalsy = (value: unknown) => { 
  return value === 0 ? true : !!value; 
}; 
```

## .d.ts

JS 文件 + .d.ts 文件   === ts 文件

.d.ts 文件可以让 JS 文件继续维持自己JS文件的身份，而拥有TS的类型保护

一般我们写业务代码不会用到，但是点击类型跳转一般会跳转到 .d.ts文件

