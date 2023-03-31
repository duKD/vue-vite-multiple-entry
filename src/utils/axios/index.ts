import axios, { type AxiosRequestConfig } from 'axios'

export const instance = axios.create({
  withCredentials: true,
  timeout: 20000
})
// interface 声明会报错同名冲突
// 自定义传入的config信息
type AxiosConfig = AxiosRequestConfig & {
  keepBaseURL: boolean
  cancelKey: string
  showLoading: boolean
}

instance.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response: any) => {
    response.data.success = response.data.returnCode === '000000'
    return response
  },
  (error) => {
    return Promise.reject(error.message)
  }
)
