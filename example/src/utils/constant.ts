// type
export type ConditionType =
  | "undefined"
  | "eq"
  | "lt"
  | "elt"
  | "gt"
  | "egt"
  | "neq"
  | "betweenValue"
  | "eqString"
  | "neqString"
  | "like"
  | "notLike"
  | "before"
  | "after"
  | "betweenTime"
  | "in"
  | "notIn"

/// constant
export const conditionType: Record<ConditionType, string> = {
  undefined: "undefined",
  //数值
  eq: "eq",
  lt: "lt",
  elt: "elt",
  gt: "gt",
  egt: "egt",
  neq: "neq",
  betweenValue: "betweenValue",
  //字符串
  eqString: "eqString",
  neqString: "neqString",
  like: "like",
  notLike: "notLike",
  //时间
  before: "before",
  after: "after",
  betweenTime: "betweenTime",
  //数组
  in: "in",
  notIn: "notIn",
}

export const conditionTypeZh = {
  [conditionType.undefined]: "未定义",
  //数值比较
  [conditionType.eq]: "等于",
  [conditionType.lt]: "小于",
  [conditionType.gt]: "大于",
  [conditionType.elt]: "小于等于",
  [conditionType.egt]: "大于等于",
  [conditionType.neq]: "不等于",
  [conditionType.betweenValue]: "在什么值之间",
  //字符串比较
  [conditionType.eqString]: "等于",
  [conditionType.like]: "包含",
  [conditionType.notLike]: "不包含",
  //日期
  [conditionType.before]: "在什么日期之前",
  [conditionType.after]: "在什么日期之后",
  [conditionType.betweenTime]: "在什么日期之间",
  //数组
  [conditionType.in]: "在数组中",
  [conditionType.notIn]: "不在数组中",
  [conditionType.neqString]: "不等于",
}
export const JsonReturnCode = {
  success: 0x0,
}
