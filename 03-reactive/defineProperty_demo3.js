// 1.字面量定义
let data = { name: 'Messi' }
data.name = 'neymar' // 这种情况下，并不知道name属性发生了变化

// 2. Object.defineProperty
let data1 = {}
Object.defineProperty(data1, 'name', {
  // 访问data1的name属性时候自动调用
  // get 函数的返回值就是你拿到的值
  get() {
    console.log('你访问了data1的name属性')
    return 'ok'
  },
  // 设置的时候....
  set(newValue) {
    console.log('data1的name属性最新的值是', newValue)
    // 在name变化的时候，完成...操作，可以放到这来执行,比如ajax()等等
  }
})

// 以上是js对象定义的另外一种方案。访问属性：data.name / data['name']， 或设置属性：data.name = 'haha' / data['name'] = 'haha' 的时候，自动调用对应的函数
