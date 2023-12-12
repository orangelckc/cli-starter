import process from 'node:process'

import app from '@/app'
import config from '@/config'
import Jobs from '@/loaders/schedule'
import { ErrorHelper, authPermission, authTokenHelper } from '@/middlewares'
import router from '@/router'
import { HttpError } from '@/utils'

app.use(config.api.prefix, authTokenHelper(), authPermission, router)
app.all('*', () => {
  throw new HttpError(404, '404 Not Found')
})

// 全局捕获异常，放在最后
app.use(ErrorHelper)

app
  .listen(config.port, () => {
    // 启动定时任务
    Jobs.forEach(job => job)

    console.info(`服务器启动成功，端口号: ${config.port}`)
  })
  .on('error', (err) => {
    console.error(err)
    process.exit(1)
  })
