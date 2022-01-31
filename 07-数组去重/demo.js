// 1.计数排序的逻辑（只能正整数）
const a = [6, 3, 4, 5, 3, 4]
const hasTab = {}

for (let i = 0; i < a.length; i++) {
  !(a[i] in hasTab) && (hasTab[a[i]] = true)
}

const res1 = Object.keys(hasTab).map((s) => parseInt(s, 10))
console.log(res1)

//2. Set去重
const b = [6, 3, 4, 5, 3, 4]
const res2 = Array.from(new Set(b))
const res3 = [...new Set(b)]
console.log(res2)
console.log(res3)

//3. WeakMap任意类型去重
