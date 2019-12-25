import axios, { AxiosRequestConfig } from "axios"
import _ from "lodash"
import { JsonReturnCode, ConditionType } from "@utils/constant"
export function delay(time: number) {
  return new Promise(s => setTimeout(s, time))
}
export interface DbBase {
  id: number
  ctime: string
  utime: string
  dtime: string
}
export type ListFilter = Record<
  string,
  {
    condition: ConditionType
    val: any
  }
>
export interface ListParam {
  page?: number
  limit?: number
  filter?: ListFilter
  order?: Record<string, "desc" | "asc">
  extra?: Record<string, any>
}
export interface JsonRes<T = unknown> {
  code: number
  page: number
  limit: number
  count: number
  msg: string
  data: T
}
interface ReqParam {
  url: string
  params?: AxiosRequestConfig["params"]
  data?: AxiosRequestConfig["data"]
  method?: AxiosRequestConfig["method"]
  baseURL?: AxiosRequestConfig["baseURL"]
}
export async function req<T = any>(param: ReqParam): Promise<JsonRes<T>> {
  return new Promise((s, j) => {
    axios
      .request<JsonRes<T>>({
        ...param,
      })
      .then(resp => {
        if (!_.isObject(resp.data)) {
          return j({ msg: "返回值不是正确的值", data: resp.data })
        }
        let json = resp.data
        const { code, msg } = json
        if (code !== JsonReturnCode.success) {
          return j({ msg })
        }
        return s(json)
      })
      .catch(e => {
        j({ msg: "网络请求失败,错误信息: " + e, data: e })
      })
  })
}

export async function bget<T = any>(param: { url: string; param?: Record<string, any> }) {
  const { url, param: params } = param
  return req<T>({
    url,
    params,
  })
}
export async function bpost<T = any>(param: { url: string; data?: Record<string, any> }) {
  const { url, data } = param
  return req<T>({
    url,
    method: "POST",
    data,
  })
}
