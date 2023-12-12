import type { NextFunction, Request, Response } from 'express'

import config from '@/config'
import { HttpStatusCode } from '@/utils'

/**
 * 全局超时中间件
 */
export async function timeoutHelper(req: Request, res: Response, next: NextFunction) {
  const time = config.api.timeout
  // 设置所有HTTP请求的服务器响应超时时间
  res.setTimeout(time, () => {
    const statusCode = HttpStatusCode.REQUEST_TIMEOUT // 408, 请求响应超时
    if (!res.headersSent) { // 若请求还未结束，则回复超时
      res.status(statusCode).json({
        success: false,
        message: '请求响应超时',
      })
    }
  })
  next()
}
