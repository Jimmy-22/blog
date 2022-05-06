#### 同步&异步的概念

**同步**就是顺序执行，指同一时间只能做一件事，只有目前正在执行的事情做完之后，才能做下一件事。同步的**优点**在于做任何事情都是依次执行，井然有序，不会存在大家同时抢一个资源的问题。**缺点**在于会阻塞后续代码的执行，如果当前执行任务需要花费很长时间，那么后续程序只能一直等待，从而影响效率。对应到前端页面来说，可能会阻塞页面的渲染，影响用户体验。

**异步**指的是当前代码的执行不影响后面代码的执行。当程序运行到异步的代码时，会将该异步的代码作为任务放进任务队列，而不是推入主线程调用栈。等主线程执行完之后，再去任务队列里执行对应的任务即可。**优点**是不会阻塞后续代码的执行。

##### JS中异步的应用场景

1. 定时任务：setTimeout，setInterval
2. 网络请求：ajax请求，动态创建img标签的加载
3. 事件监听器：addEventListener

##### 实现异步的几种方法

对于setTimeout，setInterval，addEventListener这些异步场景，不需要我们手动实现异步，直接调用即可。但是对于ajax请求，node.js操作数据库这种异步，就需要我们自己来实现了。

1. 回调函数

在微任务队列出现之前，JS实现异步的主要方式就是通过回调函数。以一个简易版的Ajax请求为例

```js	
function ajax(obj) {
  let defaultParam = {
    url: '...',
    type: 'GET',
    async: true,
    contentType: 'application/json',
    success: function() {}
  }

  for (let key in obj){
    defaultParam[key] = obj[key]
  }

  let xhr = new XMLHttpRequest()
  xhr.open(defaultParam.type,defaultParam.url,defaultParam.async)
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let result = JSON.parse(xhr.responseText)
        // 此处调用回调函数
        defaultParam.success(result)
      }
    }
  }
}

// 我们在业务代码里可以这样调用ajax请求
ajax({
  url:"#",
  type:"GET",
  success:function() {
    // 回调函数里就是对请求结果的处理
  }
})
```

ajax的success方法就是一个回调函数，回调函数中执行的是我们请求成功之后要做的进一步操作。这样就初步实现了异步，但是回调函数有一个非常严重的缺点，那就是**回调地狱**的问题。如果再回调函数里面再发起一个请求呢？那就要在success函数里继续写一个ajax请求？那如果需要多级嵌套发起ajax请求呢？岂不是需要多级嵌套？



