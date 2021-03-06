# 基础

## 基本类型
  布尔 ```boolean```

  数字 ```number,bitint```

  字符串 ```string```
  
  数组 ```类型[]``` : 固定类型的集合
  
  元组 ```[类型1,类型2,...]``` : 一定长度的各种类型的集合 不常用 跟数组的区别就是元组里面长度是固定的

  任意 ```any``` : 设置一个变量可以为任意类型的值,建议熟悉ts后不用此类型,初学阶段能不用就不用

  空值 ```void```: 函数没有函数值或返回undefined 或者 return;  表示返回值为void

  null ```null``` 

  symbol ```symbol``` js中的 Symbol 表示唯一的值

  对象 ```object``` 不常用,一般用interface定义

  未知类型 ```unknown``` 设置为此类型表示后面使用此值必须重新定义类型 与 as 一起用 比如```JSON.parse(str) as User```
  
  不可能返回类型 ```never``` 比如一个函数了执行了不会终止while(1){} 那么就没有返回值,或者函数调用总是会抛出异常 那么也是不会有返回值

## 常用语法&关键字

### 设置变量的类型 
```typescript
let varName: TypeName // 普通变量
// 函数只需要在函数头后面加上:类型 表示函数返回值
function(param1:TypeName,param2:TypeName,...): ReturnTypeName {
}
```


### 定义一个类型 ```interface```, ```type```
```typescript
// 定义一个普通变量(假设对象中的phone可能不存在) 用 interface 和 type 分别写 一个 User类型
const user = {
  name:'xxx',
  age:1,
  phone:'18011112222',
}
// interface 一般用来定义对象类型
interface User {
 // readonly 表示此属性不可以修改,设置这个之后 猪队友就不能再改name属性了,如果改,ts会提示错误
 readonly name: string
  age: string
  // 这里的? 表示此属性可选,可能不存在
  phone?: string
}

let user :User
user = {
  name:"张三",
  age:100,
}
// console.log(user.phone)
// 此行会提示报错,phone可能不存在
if(user.phone){
  // 此行不会报错,在当前作用域下 phone 肯定存在的属性 所以类型就是string
  console.log(user.phone)
}

// interface 定义多个相同类型名时会合并多个类型
// 比如 window 的类型是 Window,假设我给window加了一个新属性 overnote = 1
// 只需要加上新的类型声明到 .d.ts中(类型定义声明文件)
interface Window {
  overnote : number
} 
// interface 可以使用 extends 继承其他类型
interface Animal{
  name:string
}
// 此时Dog类型 有 name 和 age 2个属性
interface Dog extends Animal{
  age:number
}

// 用 type 实现User类型不推荐这样用 能用interface 写的就不要用type写
// 不可以同时用 type 和interface 定义同一个类型
type User = {
  readonly name: string
  age: number
  phone?: string
}
// type 一般用来 定义类型别名,组合,元组,合并类型等等

type Id = number // 定义类型别名Id  Id表示的就是number
type Gender = '男'|'女' // 定义组合类型 类似于枚举
type T1 = string | number | User // 类型可以随便写 少用,一般用于字面类型
type Param = [ 1, "buffge" ]// 定义元组
// 组合两个类型 这里的 & 是组合语法
type UserWithEmail = User & {
  email : string
}

```
###  重新声明变量或模块的类型 ```declare```,有些lib并没有提供ts类型定义文件(.d.ts),我们可以通过
  ```declare```给库加上类型
```typescript
import libA from 'libA'

// 这里用到的libA没有类型定义文件 可以新建一个.d.ts文件
declare module "libA"// 这样libA模块就是any类型
// 也可以重写libA,此时libA中就有一个number变量var1
declare module "libA" {
  export const var1: number
}
```

### 类型断言
> 有些类型是any 需要赋给他真实的类型
```typescript
let a: any = []
// 语法1 推荐
console.log((a as number[]).length)
// 语法2 不推荐 与jsx语法冲突 了解一下即可
console.log(<number[]>a.length)
```


type 常用操作

* 声明新类型 相当于C语言 typedef ```type Id = number```
* 声明元组 ```type Param = [number,string]``` 
* 声明联合类型 ```type Gender = '男'|'女' ```
* 组合多个类型 ```type A = B & C & {xx:number}```
  
### 获取类型中的所有键 并组合成新类型 ```keyof```

```typescript
interface User {
  name: string
  age: number
}
type UserKeys = keyof User// 'name'|'age'
let k: UserKeys
```

### 继承类型 ```extends```,还可以在泛型中设置泛型参数的类型

### 合并多个类型 ```&``` 将2个类型合并为一个

## 若A类型包含了B类型,则A类型变量可以赋值给B类型变量
```typescript
interface User {
  name: string
  age: number
}

interface Student {
  id: number
  name: string
  age: number
}
let st1: Student = {
  id: 1,
  age: 1,
  name: "a",
}
// 因为 Student包含了User类型 ,所以st1 可以赋值给user, 此时user 只有 name 和 age属性
// ts 会当作st1降维为了User类型
let user: User = st1
```



