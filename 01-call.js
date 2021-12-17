Function.prototype.myCall = function () {
  const args = Array.prototype.slice.call(arguments)
  //this的值
  const t = args.shift()
  const self = this
  t.fn = self
  const res = t.fn(...args)
  delete t.fn
  return res
}

function fn(a, b) {
  console.log(a)
  console.log(b)
  console.log(this)

  return 'okok'
}

const res = fn.myCall({ x: 1 }, 20, 12)
console.log(res)
