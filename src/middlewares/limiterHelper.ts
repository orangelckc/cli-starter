import RateLimit from 'express-rate-limit'

import config from '@/config'
import { HttpStatusCode } from '@/utils'

const statusCode = HttpStatusCode.TOO_MANY_REQUESTS // 429, 请求次数超限
const { interval, max } = config.api.limit

/**
 * 全局限制请求频率中间件
 */
export const limiterHelper = RateLimit({
  statusCode,
  windowMs: interval * 60 * 1000, // 计算周期，默认为10分钟
  max, // 每个周期内最大请求次数
  handler(_req, res) { // 响应格式
    if (!res.headersSent) { // 若请求还未结束，则回复请求次数超限
      res.format({
        json() {
          res.status(statusCode).json({ statusCode, message: '请求次数超限' })
        },
        html() {
          res.status(statusCode).end('<h1>请求次数超限\nToo many requests, please try again later.</h1>')
        },
      })
    }
  },
})
