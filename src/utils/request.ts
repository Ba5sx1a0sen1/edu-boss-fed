import axios, { AxiosInstance } from 'axios'
import store from '@/store'

const request: AxiosInstance = axios.create({
  // 配置选项
  // baseUrl
  // timeout
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 接口请求进入拦截器
  // 改写config，实现业务功能统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器

export default request
