//闭包是指有权访问另一个函数作用域中变量的函数
// 如何形成闭包？内部的函数存在外部作用域的引用就会导致闭包
var x = 1
var fn
function a() {
  var y = 2
  function b() {
    var z = 3
    console.log(x + y + z)
  }
  fn = b
}

fn()
