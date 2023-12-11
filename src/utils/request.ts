import axios from 'axios'

import type { IApiResponseData } from '@/api'
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { useUserStore } from '@/store'

const configDefault = {
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
  },
}

const httpWhiteList = [
  '/auth/login',
  '/auth/refresh-token',
]

// 创建一个 Axios 实例
const http = axios.create(configDefault)

// 请求拦截
http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // TODO 全局POST数据加密

    // 白名单不需要携带 Token
    if (httpWhiteList.includes(config.url!))
      return config

    const userStore = useUserStore()
    const { refreshToken } = userStore
    const { userToken } = storeToRefs(userStore)

    // 判断 token 参数是否存在
    if (!userToken.value.accessToken || !userToken.value.expires || !userToken.value.refreshToken) {
      invalidTokenHandler()

      return Promise.reject(new Error('Token 参数无效'))
    }

    // 判断请求是否过期
    if (Date.now() >= userToken.value.expires)
      // 刷新 Token后，再请求
      await refreshToken()

    // 携带 Token
    config.headers.Authorization = `Bearer ${userToken.value.accessToken}`

    return config
  },
  // 发送失败
  error => Promise.reject(error),
)

// 成功的请求返回
function responseSuccess(response: AxiosResponse) {
  // 这个 success 表示请求是否成功，不是指业务上的成功
  const { success, message, data } = response.data as IApiResponseData<any>

  if (!success) {
    ElMessage.error(message || '系统出错')

    return false
  }

  if (!data)
    return ElMessage.success(message || '操作成功')

  return response.data
}

// 失败的请求返回
function responseFailed(error: AxiosError) {
  if (!error.response) {
    ElMessage.error(error.message || '网络异常，请稍后再试')
    return Promise.reject(error.message)
  }

  // Status 是 HTTP 状态码
  const { status, data } = error.response as AxiosResponse<IApiResponseData<any>>

  switch (status) {
    case 401:
      invalidTokenHandler()
      break
    case 403:
      invalidAccessHandler()
      break
    default:
      ElMessage.error(data.message || '系统出错')
      break
  }

  return Promise.reject(error.message)
}

// 响应拦截（可根据具体业务作出相应的调整）
http.interceptors.response.use(
  responseSuccess,
  responseFailed,
)

// Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
async function invalidTokenHandler() {
  const userStore = useUserStore()

  await ElMessageBox.alert('当前登录状态已过期，请重新登录', '提示', {
    confirmButtonText: '确定',
    type: 'warning',
    closeOnPressEscape: false,
    closeOnClickModal: false,
    closeOnHashChange: false,
    showClose: false,
  })

  userStore.logout()
}

// 非法请求时，直接退出登录并强制刷新页面（会重定向到登录页）
async function invalidAccessHandler() {
  const userStore = useUserStore()

  await ElMessageBox.alert('非法请求，请重新登录', '提示', {
    confirmButtonText: '确定',
    type: 'warning',
    closeOnPressEscape: false,
    closeOnClickModal: false,
    closeOnHashChange: false,
    showClose: false,
  })

  userStore.logout()
}

export default http
