# 快速入门

如果快速的将一个js代码转换为ts代码.只需要在变量后面加上冒号和类型

## js代码
```javascript
    let active = false
    let num = 12
    let name = "overNote"
    let arr=[1,2,3]
    let tuple=[ 1, "hello" ]
    let unionData ={}
    unionData=[]
    let u  = undefined
    let n = null
    let fn1 = (name) => {
        return "Hello "+ name
    }
    class User{
        name
        age
        constructor(name, age) {
            this.name = "user-" + name
            this.age = age
        }
    }
    let user = new User(uname, 1)
```

转换为ts代码如下

```typescript
let active: boolean = false
let num: number = 12
let uname: string = "overNote"
let arr: number[] = [1, 2, 3]
let tuple: [number, string] = [1, "hello"]
let unionData: any = {}
unionData = []
let u: undefined = undefined
let n: null = null
// 函数的参数 name 是string类型,返回值也是string
let fn1 = (name: string): string => {
  return "Hello " + name
}
class User {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = "user-" + name
    this.age = age
  }
}
let user: User = new User(uname, 1)
```

### 两者代码相差几乎不大,有人会觉得这里的类型写得多余,因为后面数值是数字或者字符一眼就看出来了,确实 这里的类型可以不写,ts有自动推导功能,这里只是用作演示
