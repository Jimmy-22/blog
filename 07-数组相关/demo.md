### 数组去重的几种方法

#### 1.计数排序的逻辑（只能正整数）
```js
const a = [6, 3, 4, 5, 3, 4]
const hasTab = {}

for (let i = 0; i < a.length; i++) {
  !(a[i] in hasTab) && (hasTab[a[i]] = true)
}

const res1 = Object.keys(hasTab).map((s) => parseInt(s, 10))
console.log(res1)
```

#### 2. Set去重
```js
const b = [6, 3, 4, 5, 3, 4]
const res2 = Array.from(new Set(b))
const res3 = [...new Set(b)]
console.log(res2)
console.log(res3)
```
#### 3. 遍历检查
```js
function unique(arr) {
  /* your code */
}
let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];
console.log( unique(strings) ); // ['Hare', 'Krishna', ':-O']
```
解决方案：
```js
function unique(arr) {
  let result = []
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str)
    }
  }
  return result
}
```
代码有效，但其中存在潜在的性能问题。如果 arr.length 是 10000，我们会有 10000 * 10000 = 1 亿次的比较。所以该解决方案仅适用于小型数组。

#### 4. WeakMap任意类型去重


### 如何通过JS判断一个数组

instanceof
```js
var arr = []
arr instanceof Array
```

JQ使用的写法：
```js
var arr = []
Object.prototype.toString.call(arr) === '[object Array]'
```

利用这个方法，可以写一个返回数据类型的方法
```js
let isType = function (obj) {
  return Object.prototype.toString.call(obj).slice(8,-1)
}
```

isArray()
```js
let a = new Array(123)
let b = new Date()
console.log(Array.isArray(a)) // true
console.log(Array.isArray(b)) // false
```

