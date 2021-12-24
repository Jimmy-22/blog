//监听对象的操作
const obj = { name: 'messi', age: '34' }

// Object.defineProperty(obj, 'name', {
//   get: function () {
//     console.log('监听到obj对象的name被访问了')
//   },
//   set: function () {
//     console.log('监听到obj对象的name被设置值')
//   }
// })

Object.keys(obj).forEach((key) => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    get: function () {
      console.log(`监听到obj对象的${key}被访问了`)
      return value
    },
    set: function (newValue) {
      console.log(`监听到obj对象的${key}被设置值`)
      value = newValue
    }
  })
})

// //对对象的访问
// console.log(obj.name)
// //操作
// obj.name = 'aaaa'

obj.name = 'aaaa'
obj.age = 18
console.log(obj.name)
console.log(obj.age)
