// import { checkCache } from '@/middlewares'
import { Router } from 'express'

import { HttpError, HttpResponse, generateAccessToken } from '@/utils'
import { handleValidationError, timeoutRules } from '@/validators'

const exampleRouter = Router()

// exampleRouter.get('/redis', checkCache, (req, res) => {
//   return res.json(new HttpResponse({
//     success: false,
//     message: '没有缓存',
//   }))
// })

exampleRouter.get('/token', (req, res) => {
  return res.json(new HttpResponse({
    success: true,
    data: generateAccessToken({ uid: 3, name: 'admin' }),
  }))
})

exampleRouter.get('/error', () => {
  throw new HttpError(500, '测试服务器出现错误')
})

exampleRouter.get('/valid-token', async () => {
  throw new HttpResponse({
    success: true,
    message: '测试token校验成功',
  })
})

exampleRouter.get(
  '/timeout',
  timeoutRules(),
  handleValidationError,
  async (req, res) => {
    const time = req.query.time
    await new Promise(resolve => setTimeout(resolve, time))
    return res.json({ msg: `测试请求超时${time}ms` })
  },
)

exampleRouter.get(
  '/permission',
  async (req, res) => {
    return res.json(new HttpResponse({
      success: true,
      message: '测试权限校验成功',
    }))
  },
)

export default exampleRouter
