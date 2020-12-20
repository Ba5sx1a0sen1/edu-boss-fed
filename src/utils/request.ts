/* eslint-disable @typescript-eslint/no-use-before-define */
import axios, { AxiosInstance } from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import qs from 'qs'

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

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

let isRefreshing = false
let requests: any[] = []
// 响应拦截器
request.interceptors.response.use(function (response) { // 状态吗2xx进入正确拦截器
  // 如果是自定义状态码，错误处理写到这里
  return response
}, async function (error) { // 状态码超出2xx执行错误拦截器
  // 如果是使用 HTTP 状态码，错误处理则写到这里

  if (error.response) { // 请求发出去了，但是响应状态码超出了 2xx 范围
    // 400 401 403 403 500
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token无效 过期 无token
      // 如果有 refresh_token，则进行请求，若没有则跳转到登录页面
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      // 刷新 token
      if (!isRefreshing) {
        isRefreshing = true // 开启刷新状态

        // 使用refresh_token获取新token
        return refreshToken()
          .then(res => {
            // 成功 -> 把本次失败的请求重发出去重试
            if (!res.data.success) {
              throw new Error('刷新 Token 失败')
            }
            // 把刷新拿到的新 access_token 更新到容器和本地持久化中
            store.commit('setUser', res.data.content)
            // 把 requests 队列中的请求重新发出去
            requests.forEach(cb => cb())
            // 重置 requests 数组
            requests = []
            return request(error.config) // 重新请求
          })
          .catch(err => {
            console.log(err)
            // 失败 -> 跳转到登录页，重新登录获取token
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(error)
          })
          .finally(() => {
            isRefreshing = false // 重置刷新状态
          })
      } else {
        // 刷新状态下，把请求挂起放到 requests 中
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
      }
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去了，但没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了错误
    Message.error(`请求失败：${error.message}`)
  }

  return Promise.reject(error)
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
