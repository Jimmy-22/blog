//Proxy类，用于创建代理
//监听一个对象的相关操作，可以先创建一个代理对象
//之后所有对对象的操作，通过代理对象完成
const obj = {
  name: 'messi',
  age: '33'
}

const objProxy = new Proxy(obj, {
  //获取值时的捕获器
  get: function (target, key) {
    return target[key]
  },
  //设置值时的捕获器
  set: function (target, key, newValue) {
    target[key] = newValue
  }
})

console.log(objProxy.name)
