### useRef: 在多次渲染之间共享数据

用法：
```js
const myRefContainer = useRef(initialValue)
```
我们可以把useRef看作是在函数组件之外创建的一个容器空间。在这个容器上，可以通过唯一的current设置一个值，从而在函数组件的多次渲染之间共享这个值。

假设要去做一个计时器组件，这个组件有开始和暂停两个功能。显然，需要用window.setInterval来提供计时功能。而为了能暂停，你就需要在某个地方保存这个window.setInterval返回的计数器的引用，确保在点击暂停按钮的同时,也能用window.clearInterval停止计时器。那么，这个保存计数器引用最合适的地方，就是useRef,因为它可以存储跨渲染的数据。代码如下：
```jsx
import React, {useState, useCallback, useRef} form 'react'

export default function timer() {
    // 用于保存计时器的累计时间
    const [time, setTime] = useState(0)
    // 定义timer这样一个容器用于在跨组件渲染之间保存一个变量
    const timer = useRef(null)
    const handleStart = useCallback(() => {
        timer.current = window.setInterval(() => {
            setTime(time => time + 1)
        }, 100)
    }, [])
    const handlePause = useCallback(() => {
        window.clearInterval(timer.current)
        timer.current = null
    }, [])
    
    return (
        <div>
            {time / 10} seconds
            <br />
            <button onClick={handleStart}>start</button>
            <button onClick={handlePause}>pause</button>
        </div>
    )
}
```

使用useRef保存的数据一般是和UI渲染无关的，因此当ref的值发生变化时，不会触发组件重新渲染。useRef还有一个重要功能，就是保存某个DOM节点的引用。比如，你需要在点击某个按钮时让某个输入框获得焦点：
```jsx
function TextInputWithFocusButton() {
    const inputEl = useRef(null)
    const onBtnClick = () => {
        // current属性指向了真实的input这个dom节点，从而可以调用focus方法
        inputEl.current.focus()
    }
    
    return (
        <>
          <input ref={inputEl} type="text" />
          <button onClick={onBtnClick}>focus the input</button>
        </>
    )
}
```
