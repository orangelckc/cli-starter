/**
 * http响应数据模型
 */
export class HttpResponse {
  constructor(obj?: HttpResponse) {
    if (obj)
      Object.assign(this, obj)
  }

  /**
   * 自定义响应状态码
   * 目前不使用
   *
   * @type {number}
   */
  statusCode?: number
  /**
   * 消息说明
   *
   * @type {string}
   */
  message?: string
  /**
   * 状态码>=400时的http status
   *
   * @type {string}
   */
  error?: string

  /**
   * 错误堆栈
   *
   * @type {string}
   */
  stack?: string
  /**
   * 返回的数据
   *
   * @type {any}
   */
  data?: any
  /**
   * 是否成功
   *
   * @type {boolean}
   */
  success: boolean
}
