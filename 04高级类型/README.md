# 04 高级类型

## 联合类型

比如一个变量id 可能是string类型 也可能是number类型那么 可以设置类型``` type Id = number|string```
还有用户的性别可能是 男女和未知那么变量 gender的类型 可以这样写```type Gender = '男'|'女'|'未知'``` 此时如果将其他值赋值给gender 编辑器会提示报错

## 常用的预定义类型(不了解泛型的可以先看下第三章泛型)
* ```Exclude<T, U>``` 从T排除U类型。
* ```Extract<T, U>``` 从T中提取出U中也有的类型。
* ```NonNullable<T>```去除 T 中的null和undefined类型
* ```ReturnType<T>``` 获取函数类型的返回类型。
* ```InstanceType<T>``` 获取构造函数类型的实例类型。
* ```Pick<T,K>``` 挑选T类型中 字段名在中K中的属性组成一个新对象类型
* ```Omit<T,K>``` 排除T类型中 字段名在中K中的属性组成一个新对象类型
* ```Partial<T>``` 使T类型中所有属性变为可选 就是加了个?
* ```Required<T>``` 使T类型中所有属性变为必填 就是去掉所有属性的?
* ```Record<K,V>``` 生成一个对象类型,对象的键都是K类型,值都是V类型
eg.
```typescript
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1(s: string) {
    return { a: 1, b: s };
}

class C {
    x = 0;
    y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // never
type T17 = ReturnType<string>;  // Error
type T18 = ReturnType<Function>;  // Error

type T20 = InstanceType<typeof C>;  // C
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // never
type T23 = InstanceType<string>;  // Error
type T24 = InstanceType<Function>;  // Error

type A1 = {
  id: number
  name: string
  age: number
}
// B1 {name:string,age:number}
type B1 = Pick<A1, "name" | "age">
let b1: B1 = {
  name: '',
  age: 1,
}
// C1 {id:number}
type C1 = Omit<A1, "name" | "age">
let c1: C1 = {
  id: 1
}

const idMapName:Record<number,string> ={
  1:'aaa',
  2223:'bbb'
} 

```

