Function.prototype.myCall = function (thisArgs, ...args) {
  //获取需要被执行的函数
  var fn = this
  thisArgs = thisArgs ? Object(thisArgs) : window
  thisArgs.fn = fn
  thisArgs.fn()
  delete thisArgs.fn
}

function foo() {
  console.log('foo函数被执行了', this)
}

function sum(num1, num2) {
  console.log('sum函数被执行了', this, num1, num2)
}

//foo.call('试试看')
foo.myCall(null)
