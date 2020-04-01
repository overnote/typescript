import { BaseExtra, GetListParam, bpost, DbBaseField, UpdateRespData, DelRespData } from "./api"

/**
 * tpl
 */
export interface Tpl extends DbBaseField {
  uid: number
}

type Model = Tpl
type FilterKeys = "id" | "ctime"
type OrderKeys = "id" | "ctime"
type Scene = "admin" | "default"
interface QueryExtra extends BaseExtra<Scene> {}
type ActGetListParam = GetListParam<FilterKeys, OrderKeys, QueryExtra>
const route = "/tpl"
type AddData = Omit<Model, "id">
type EditData = AddData & Pick<Model, "id">

export async function list<T = Model>(data: ActGetListParam) {
  return bpost<{ list: T[] }>({
    url: route + "/list",
    data,
  })
}
export async function detail<T = Model>(data: { id: number; scene?: Scene }) {
  return bpost<{ detail: T }>({
    url: route + "/detail",
    data,
  })
}
export async function add(data: AddData) {
  return bpost({
    url: route + "/add",
    data,
  })
}
export async function edit(data: EditData) {
  return bpost<UpdateRespData>({
    url: route + "/edit",
    data,
  })
}
export async function del(ids: number[]) {
  return bpost<DelRespData>({
    url: route + "/del",
    data: {
      ids,
    },
  })
}
