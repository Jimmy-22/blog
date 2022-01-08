//面向对象中的new关键字
//1.创建类实例-对象
//2.创建实例的时候执行构造函数
class Person {
  constructor(name) {
    this.name = name
  }
  run() {
    console.log(`${this.name} is running`)
  }
}

const messi = new Person('messi')
messi.run() //messi is running

//JS中的变化
//1.构造函数 2.通过原型定义属性和方法 3.this的引入
// function Man() {
//   this.name = name
// }
// Man.prototype.say = function () {
//   console.log('my name is', this.name)
// }

//new的作用分析
// TODO 构造函数被执行
function Man(name) {
  // TODO 将构造函数的this指向新对象
  this.name = name
}
// TODO 将新对象的__proto__属性设置为构造函数的prototype
Man.prototype.say = function () {
  console.log('my name is', this.name)
}

//TODO 创建新对象
const obj = new Man('neymar')
obj.say() //my name is neymar

//手写模拟new
function myNew(fn, ...args) {
  //创建一个空对象
  const obj = {}
  // 将该对象的 __proto__ 属性链接到构造函数原型对象
  obj.__proto__ = fn.prototype
  //将该对象作为this上下文调用构造函数，并接受返回值
  const result = fn.apply(obj, args)
  // 如果返回值存在并且是引用数据类型，返回构造函数返回值，否则返回创建的对象
  return typeof result === 'object' ? result : obj
}

const c = myNew(Man, 'b')
c.say() //my name is b
