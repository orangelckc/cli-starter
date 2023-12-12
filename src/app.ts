import compression from 'compression'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'

import { limiterHelper, requestHelper, timeoutHelper } from '@/middlewares'

class Server {
  public readonly app: express.Application
  constructor() {
    this.app = express()
    this.config()
  }

  private config(): void {
    // 记录请求日志
    this.app.use(requestHelper)
    // 支持gzip压缩
    this.app.use(compression())
    // 请求超时限制
    this.app.use(timeoutHelper)
    // 限制请求频率
    this.app.use(limiterHelper)
    // 支持跨域
    this.app.use(cors())
    // 支持json编码的主体
    this.app.use(express.json())
    // 支持编码的主体
    this.app.use(
      express.urlencoded({
        extended: true,
        limit: '2mb', // 限制大小
      }),
    )
  }
}

const app = new Server().app

export default app
