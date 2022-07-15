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