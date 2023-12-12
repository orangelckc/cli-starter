import { Router } from 'express'

import adminRouter from './modules/admin'
import authRouter from './modules/auth'
import deptRouter from './modules/dept'
import exampleRouter from './modules/example'
import fileRouter from './modules/file'
import interfaceRouter from './modules/interface'
import menuRouter from './modules/menu'
import roleRouter from './modules/role'

import { nestRouterPrefix } from '@/utils'

const router = Router()

router.use(
  nestRouterPrefix.example,
  exampleRouter,
)

router.use(
  nestRouterPrefix.auth,
  authRouter,
)

router.use(
  nestRouterPrefix.admin,
  adminRouter,
)

router.use(
  nestRouterPrefix.dept,
  deptRouter,
)

router.use(
  nestRouterPrefix.role,
  roleRouter,
)

router.use(
  nestRouterPrefix.menu,
  menuRouter,
)

router.use(
  nestRouterPrefix.interface,
  interfaceRouter,
)

router.use(
  nestRouterPrefix.file,
  fileRouter,
)

export default router
