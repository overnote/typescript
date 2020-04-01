import { ConditionType, JsonReturnCode } from "@/utils/constant"
import axios, { AxiosRequestConfig } from "axios"
import _ from "lodash"
export type DefaultScene = "default" | "admin"
export interface BaseExtra<S extends string> {
  scene: S
}
export interface UpdateRespData {
  affectRows: number
}
export type DelRespData = UpdateRespData
export interface DbBaseField {
  id: number
  ctime?: string
  utime?: string
  dtime?: number
}
export type FilterVal = boolean | string | number | string[] | number[]
export type DefaultOrderKeys = "id" | "ctime"
export interface GetListParam<
  F extends string = any,
  O extends string = DefaultOrderKeys,
  E extends BaseExtra<any> = BaseExtra<DefaultScene>
> {
  page?: number
  limit?: number
  filter?: Partial<Record<F, { condition: ConditionType; val: FilterVal }>>
  order?: Partial<Record<O, "desc" | "asc">>
  extra?: Partial<E> // 扩展用来放一些其他参数 比如withSubUsers:true,表示带上所有的子用户
}

// 上传图片
export async function antdUploadImg(formData: FormData) {
  return bpost({
    url: "/antdUploadImg",
    data: formData,
  })
}
// 获取obj-url 图片的blob数据
export function getBlobFromObjectUrl(url: string) {
  return new Promise<Blob>((s, j) => {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.responseType = "blob"
    xhr.onload = function() {
      if (this.status === 200) {
        let blob = this.response
        s(blob)
      }
    }
    xhr.onerror = () => {
      j("get Object.Url failed")
    }
    xhr.send()
  })
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
