let getDouble = (n) => n * 2
let obj = {}
let count = 1
let double = getDouble(count)

let proxy = new Proxy(obj, {
  get: function (target, prop) {
    return target[prop]
  },
  set: function (target, prop, value) {
    target[prop] = value
    if (prop === 'count') {
      double = getDouble(value)
    }
  },
  deleteProperty(target, prop) {
    delete target[prop]
    if (prop === 'count') {
      double = NaN
    }
  }
})

console.log(obj.count, double) //undefined 2
proxy.count = 2
console.log(obj.count, double) //2 4

delete proxy.count
console.log(obj.count, double) //undefined NaN
