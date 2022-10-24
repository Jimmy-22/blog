### 组件卸载后执行状态更新
报错信息：`Can’t perform a React state update on an unmounted component`

这个报错就是因为在组件树的某个地方，状态更新被触发到已经卸载的组件上了。也就是说，我们不能在组件销毁后更新 state，防止出现内存泄漏。

```jsx
const Component = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetchAsyncData().then(data => setData(data))
  }, [])
  
  // ...
}
```
比如，在请求数据时，由于跳转到了B页面，A页面的数据请求还在进行中，但是页面已经销毁了，就会出现这种情况。那该如何解决这个问题呢？有两种方法：

(1) 组件卸载时取消异步请求

第一种方法（推荐），就是在组件卸载时取消异步请求。一些异步请求库提供了取消异步请求的方法。如果没有使用第三方库，可以使用 `AbortController` 来取消。这种方法本质上就是在组件卸载时取消副作用:
```jsx
const Component = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal }).then((data) => setData(data));
    return () => {
      controller.abort();
    }
  }, []);

  // ...
};
```

(2) 跟踪组件是否已经挂载，如果还没挂载或已经卸载，返回 false；否则返回 true。不过，不建议使用这种方法。这样保留了未挂载组件的引用，可能会导致内存泄漏和性能问题。

```jsx
const Component = () => {
  const [data, setData] = useState(null);
  const isMounted = useRef(true)
  useEffect(() => {
    fetchAsyncData().then(data => {
      if(isMounted.current) {
        setData(data)
      }
    });
    return () => {
      isMounted.current = false;
    }
  }, []);

  // ...
}
```

### 渲染列表时不使用 key
报错信息：`Warning: Each child in a list should have a unique key prop`

React 开发中最常见的就是遍历数组来渲染组件。在JSX中，可以使用`Array.map`将该逻辑嵌入到组件中，并在回调中返回所需的组件。如下：

```jsx
import { Card } from "./Card";  
  
const data = [  
  { id: 1, text: "Messi" },  
  { id: 2, text: "Neymar" },  
  { id: 3, text: "Suarez" }  
];

export default function App() {
  return (
    <div className="wrapper">
      {data.map(content => {
        <div className="card">
          <Card text={content.text}/>
        </div>
      })}
    </div>
  )
}
```
这样会收到如下警告：`Warning: Each child in a list should have a unique key prop`，这表示需要给生成的每个组件一个唯一的key。所以，要在`map`回调返回的JSX的最外层元素添加一个`key`值，该值应该是一个字符串或者数字，并且在这个组件列表中应该是唯一的。
```jsx
export default function App() {  
  return (  
    <div className="wrapper">  
      {data.map((content) => (  
        <div key={content.id} className="card">  
          <Card text={content.text} />  
        </div>  
      ))}  
    </div>  
  );  
}
```
尽管不遵守这个要求也不会导致应用崩溃，但它可能会导致一些意外的情况。React 会使用这些`key`来确定列表中的哪些子项发生了更改，并使用此信息来确定可以重用先前 DOM 的哪些部分，以及在重新渲染组件时应该重新计算哪些部分。因此，建议添加 key。

### Hooks调用顺序错误
报错信息：`React Hook "useXXX" is called conditionally. React Hooks must be called in the exact same order in every component render`

```jsx
const Toggle = () => {
  const [isOpen, setIsOpen] = useState(false)
  if(isOpen) {
    return <div>{/* ... */}</div>
  }
  const openToggle = useCallback(() => setIsOpen(true), [])
  return <button onClick={openToggle}>{/* ... */}</button>
}
```
