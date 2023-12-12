import process from 'node:process'

import { UnauthorizedError } from 'express-jwt'

import type { NextFunction, Request, Response } from 'express'

import { HttpError, HttpResponse, HttpStatusCode } from '@/utils'

/**
 * 全局错误处理中间件
 * @param err 抛出的错误
 */

export function ErrorHelper(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  let message: string | undefined = 'Unknown Error'
  let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR // 500, 服务器内部错误

  if (err instanceof HttpError) {
    message = err.message
    statusCode = err.statusCode
    // 开发阶段打印堆栈信息
    if (process.env.NODE_ENV === 'development')
      console.error(err.stack)
  }
  else if (err instanceof UnauthorizedError) {
    statusCode = HttpStatusCode.UNAUTHORIZED
    message = '无效的令牌'
  }
  else if (err instanceof Error) {
    message = err.message
    // 开发阶段打印堆栈信息
    if (process.env.NODE_ENV === 'development')
      console.error(err.stack)
  }
  else if (typeof err === 'string') {
    message = err
  }

  // 日志记录错误信息
  if (statusCode >= HttpStatusCode.INTERNAL_SERVER_ERROR)
    console.error(err)
  else
    console.info(message)

  // 若请求还未结束，则回复错误
  if (!res.headersSent) {
    res.status(statusCode).json(new HttpResponse({
      message,
      success: false,
    }))
  }
}
