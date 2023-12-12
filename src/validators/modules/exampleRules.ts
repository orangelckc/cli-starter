import { query } from 'express-validator'

/**
 * 请求超时接口参数校验规则
 */
function timeoutRules() {
  /**
   * @query opt
   * @type {number}
   * @description
   * 1. time参数如果不存在，给一个默认值1000
   * 2. time参数必须是整数
   * 3. time参数必须是1000-10000之间的整数
   */
  const timeChain = query('time')
    .default(1200)

    .isInt()
    .withMessage('time参数必须是整数')
    .bail()

    .isInt({ min: 1000, max: 15000 })
    .withMessage('time参数必须是1000-10000之间的整数')
    .bail()

  return [
    timeChain,
  ]
}

export {
  timeoutRules,
}
