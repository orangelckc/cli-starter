import { Router } from 'express'

import { AuthController } from '@/controllers'
import { authRefreshTokenRules, authUsernamePasswordRules, handleValidationError } from '@/validators'

const authRouter = Router()

authRouter.post(
  '/login',
  authUsernamePasswordRules(),
  handleValidationError,
  AuthController.login,
)

authRouter.get(
  '/logout',
  AuthController.logout,
)

authRouter.post(
  '/refresh-token',
  authRefreshTokenRules(),
  handleValidationError,
  AuthController.refreshToken,
)

authRouter.get(
  '/',
  AuthController.getLoginUserInfo,
)

export default authRouter
