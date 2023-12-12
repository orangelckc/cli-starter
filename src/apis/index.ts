import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'

import { useToast } from '@/utils/tools'

const request = createAlova({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  shareRequest: true,
  ...AdapterUniapp(),
  beforeRequest(method) {
    method.config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    // 处理请求头token
  },
  responded(response) {
    const { statusCode, data } = response as UniNamespace.RequestSuccessCallbackResult
    const res = data as Data<null>
    if (statusCode >= 400) {
      useToast(res.message, 'error')
      throw new Error(res.message)
    }

    if (!res.success)
      useToast(res.message, 'error')

    return res.data || null
  },
})

export default request
