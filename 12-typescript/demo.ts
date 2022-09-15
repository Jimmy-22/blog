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
