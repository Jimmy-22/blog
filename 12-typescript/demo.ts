type Name = string
const str: Name = 'fal'

type Id = string | number
const id1: Id = '123'
const id2: Id = 222

type User = {
  readonly id: string | number
  name: string
  age?: number
}

const u: User = {
  id: 22,
  name: 'dfd'
}

type Dir = '东' | '南' | '西' | '北'
const d: Dir = '东'

type A = {
  ta: 'a'
  specialForA: string
}

type B = {
  tb: 'b'
  specialForB: number
}

// type C = A | B

// const c1: C = {
//     t: 'b',
//     specialForB: 2
// }

type C = A & B
const c2: C = {
  ta: 'a',
  tb: 'b',
  specialForB: 1,
  specialForA: '22'
}

interface User1 {
  readonly id: number | string
  name: string
  age?: number
}

type Dog = string
type Cat = 'Catt'
interface UserWithDog extends User1 {
  dog: Dog
}
const uu2: UserWithDog = {
  name: 'ddd',
  age: 11,
  id: 1,
  dog: '222'
}

interface UserWithPet<T> extends User1 {
  pet: T
}

const uu3: UserWithPet<Cat> = {
  id: 1,
  name: 'ddd',
  age: 22,
  pet: 'Catt'
}

type F1 = (a: number, b: number) => number
const f1: F1 = (a, b) => a + b

const f2 = (a: number, b:number): number => { 
    return a + b
}

  
// type A = string | number
// function f1(a: A) {
//     a.
// } 

type AddEventListener = (eventType: string, fn: (e: Event) => void, useCapture?: boolean) => void
const addEventListener2: AddEventListener = (eventType, fn, useCapture = false) => {
    // body
}

addEventListener2('click', ()=>{})

// useCapture既是可选的，又会默认推测类型
const addEventListener3 = (eventType: string, fn: () => void, useCapture = false) => {

}
addEventListener3('click', ()=>{})

type Config = {a: string[], b: string}
// const fn = (config: Config = {a: [], b: 'bbbb'}) => {}
const fn = (config = {a: [], b: 'bbbb'} as Config) => {}

type F = (n: number) => (m: number) => number
const createAdd: F = m => m => m + n

// // 重载。同名函数，参数类型不同,参数个数不同，都不同
// type Print = (n: string | number) => void // 没必要用重载

// // type Print2 = (a: string | number, b?: string | number) => void   // 能接受一个或者2个参数
// type Print3 = (a: boolean, b: string | number) => void   // a是可选的，但是可选的只能放在后面
// // 可选参数和类型联合满足不了的场景，重载来弥补

// 重载去控制对参数的精确描述。根据参数去选择调用的入口
// 场景描述  重载签名
function createDate(n: number): Date
function createDate(year: number, month:number, date: number): Date
// 实现 实现签名, 参数类型和个数需要兼容上面的
function createDate(x: number, y?: number, z?: number): Date {
    if (z !== undefined && y !== undefined) {
        return new Date(x, y, z)
    } 
    if (x !== undefined && y === undefined && z === undefined) {
        return new Date(x)
    }
    throw new Error('传参错误')
}

function createDateFromNumber(n: number): Date { 
    return new Date(n)
}
function createDateFromYMD(y: number, m: number, d: number): Date{
    return new Date(y, m, d)
}

type Person = {
    name: string 
}

function f (this: Person, n: number) {
     console.log(n)
}

// f(1)

const p: Person & {f: typeof f} = {name: 'messi', f: f}
p.f(1)

const p2: Person = {name: 'messi'}
f.call(p2, 1)

function ff(a: number, b:number, c:number) {
    console.log(a + b + c)
}

const ff2 = ff.bind(null) // null -> this
const ff3 =  ff2.bind(null, 1)
const ff4 = ff3.bind(null, 2)
const ff5 = ff4.bind(null, 3)

console.log(ff5())

function fff(y: string, ...x: number[]) {
    console.log(x)
}

// 剩余参数
// as const
// 参数对象析构

type Configs = {
    method: 'GET' | 'POST',
    data?: unknown,
    query?: {}
}
 
function test ({method, data, ...rest}: Configs = {method: 'GET'}) {
    console.log(method)
    console.log(data)
}

// void 返回值
function ftest(): void{
    // return null 不行
}

// 函数的本质：推后执行的、部分待定的代码
// 如果没有泛型，有些奇怪的需求就无法满足。没有泛型的类型系统，就如同没有函数的编程语言

interface Hash<V = string> {
    [key: string]: V
}

// 带入法
type X = Hash<string>

// 包含于 
type Person2 = {name: string}
type LikeString<T> = T extends string ? true : false 
type LikeNumber<T> = T extends number ? 1 : 2
type LikePerson<T> = T extends Person ? 'ok' : 'no_ok'

type R1 = LikeString<'hi'> // true
type R2 = LikeString<true> // false
type S1 = LikeNumber<222> // 1
type S2 = LikeNumber<true> // 2
type T1 = LikePerson<{name: 'messi', age: 35}> // ok
type T2 = LikePerson<{xxx: 1}> // no_ok
type X1 = LikeString<never> // never
// 若T为联合类型，则分开计算
type ToArray<T> = T extends unknown ? T[] : never
type Result = ToArray<string | number>  // string[] | number[]
