# 基础

## ts 常用类型
  布尔 ```boolean```

  数字 ```number```

  字符串 ```string```
  
  数组 ```类型[]``` : 固定类型的集合
  
  元组 ```[类型1,类型2,...]``` : 一定长度的各种类型的集合 不常用 跟数组的区别就是元组里面长度是固定的

  任意 ```any``` : 设置一个变量可以为任意类型的值,建议少用

  空值 ```void```: 函数没有函数值 或者 return; 表示返回值为void

## 定义一个新类型
   使用interface 或 type,一般interface 用来给对象写类型,type用来声明新类型,写联合类型,元组,和组合类型

   例如: 为 对象```{name:"张三",age:100,phone:可能没有这个属性}```编写类型
```typescript
// User 是类型名,可以随便写,一般定义的类型都是大驼峰格式
interface User{
  // readonly 表示此属性不可以修改
  readonly name:string
  age:number
  // 这里的? 表示此属性可选,可能不存在
  phone?:string
}
let user :User
user = {
  name:"张三",
  age:100,
}
// 此行会提示报错,phone可能不存在
// console.log(user.phone)
if(user.phone){
  // 此行不会报错,在当前作用域下 phone 肯定存在的属性 所以类型就是string
  console.log(user.phone)
}
```
> interface 一般用作Object和Class的类型 ,可以继承(extends)其他interface,也可以组合(&关键字)其他对象类型
比如:
```typescript
interface Animal{
  name:string
}
// 此时Dog类型 有 name 和 age 2个属性
interface Dog extends Animal{
  age:number
}
// 第二种组合方式
interface A{
  name:string
}
// type 表示声明一个新类型,type 是可以赋值的,interface不可以
type B = A & {
  age : number
}
```
type 常用操作

* 声明新类型 相当于C语言 typedef ```type Id = number```
* 声明元组 ```type Param = [number,string]``` 
* 声明联合类型 ```type Gender = '男'|'女' ```
* 组合多个类型 ```type A = B & C & {xx:number}```

