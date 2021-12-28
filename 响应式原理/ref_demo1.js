let getDouble = (n) => n * 2
let _value = 1
double = getDouble(_value)

let count = {
  get value() {
    return _value
  },
  set value(val) {
    _value = val
    double = getDouble(_value)
  }
}

console.log(count.value, double) //1 2
count.value = 3
console.log(count.value, double) //3 6
