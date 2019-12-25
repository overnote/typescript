# 03 泛型

> 一句话简单介绍 泛型就是 批量替换

有如下ts函数
```typescript
function generateEmail(name:string):string {
  return name+'同学你好,xxxxxxxxx'+
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+
  'xxxxxxxxx'+ name +'xxxxxxxxx'
}
```
这是一篇生成邮件内容的函数, 模板 + 变量 -> 生成真正的邮件,
泛型就是 类型模板+泛型变量 -> 生成真正的类型

例如: 最常见的json result
```typescript
// T 在这里是形参,名字随便写,一般用 T(type),V(val),K(keys)
// 这里的泛型 JsonRes<T> 相当于js函数buildJsonResTpl(type)
// 泛型是对类型进行操作,js函数是对变量进行操作
// 函数也可以泛型,是对函数内部的类型进行操作
interface JsonRes<T>{
  code:number
  msg:string
  data:T
}
```
前端一般一个小项目都有上百个接口.每个接口返回的data类型可能都不一样,但是code 和 msg 的类型是永远一样的.所以我们可以写一个模板 模板中 code 和 msg 是写死的.data 是可变的.
假如 getUserInfo接口返回的data 是 UserInfo 类型 我们可以这样写
```typescript
  interface UserInfo{
    name: string
    age: number
  }
  // 这里表示参数可以是任意值,返回值是Promise,Promise泛型值T 表示
  // resolve时返回的变量类型
  function request<T>(data:any) :Promise<JsonRes<T>> {
    // xxx 
  }
  async function getUserInfo<T>(data:{id:number}){
    return request<T>(data)
  }
  getUserInfo<UserInfo>({id:1})
  .then(json=>{
    // 此时info 变量就是UserInfo类型
    const info = json.data
  }).catch(()=>{})

```

## 泛型默认值

> 泛型变量可以跟普通函数变量一样设置默认值
```typescript
interface JsonRes<T=any>{
  code:number
  msg:string
  data:T
}
// 此时不传参数data的类型就是any
let json:JsonRes
```
