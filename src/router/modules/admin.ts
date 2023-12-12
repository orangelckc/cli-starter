import { Router } from 'express'

import { AdminController } from '@/controllers'
import { adminCreateRules, adminDeleteRules, adminFormRules, adminListRules, adminUpdatePasswordRules, adminUpdateRules, adminUpdateStatusRules, handleValidationError } from '@/validators'

const adminRouter = Router()

adminRouter.post(
  '/',
  adminCreateRules(),
  handleValidationError,
  AdminController.create,
)

adminRouter.get(
  '/list',
  adminListRules(),
  handleValidationError,
  AdminController.list,
)

adminRouter.put(
  '/',
  adminUpdateRules(),
  handleValidationError,
  AdminController.update,
)

adminRouter.patch(
  '/status',
  adminUpdateStatusRules(),
  handleValidationError,
  AdminController.updateStatus,
)

adminRouter.delete(
  '/',
  adminDeleteRules(),
  handleValidationError,
  AdminController.destory,
)

adminRouter.patch(
  '/password',
  adminUpdatePasswordRules(),
  handleValidationError,
  AdminController.updatePassword,
)

adminRouter.get(
  '/form',
  adminFormRules(),
  handleValidationError,
  AdminController.form,
)

export default adminRouter
