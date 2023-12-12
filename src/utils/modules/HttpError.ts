import type { HttpStatusCode } from '@/utils'

/**
 * Http抛出错误模型
 * @param statusCode Http状态码
 * @param message 错误信息
 */
export class HttpError extends Error {
  statusCode: HttpStatusCode
  constructor(statusCode: HttpStatusCode, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}
