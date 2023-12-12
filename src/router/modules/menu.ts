import { Router } from 'express'

import { MenuController } from '@/controllers'
import { handleValidationError, menuCreateRules, menuDestoryRules, menuFormRules, menuListRules, menuUpdateRules, menuUpdateVisibleRules } from '@/validators'

const menuRouter = Router()

menuRouter.post(
  '/',
  menuCreateRules(),
  handleValidationError,
  MenuController.create,
)

menuRouter.get(
  '/list',
  menuListRules(),
  handleValidationError,
  MenuController.list,
)

menuRouter.patch(
  '/status',
  menuUpdateVisibleRules(),
  handleValidationError,
  MenuController.updateVisible,
)

menuRouter.get(
  '/',
  MenuController.routes,
)

menuRouter.get(
  '/options',
  MenuController.options,
)

menuRouter.put(
  '/',
  menuUpdateRules(),
  handleValidationError,
  MenuController.update,
)

menuRouter.delete(
  '/',
  menuDestoryRules(),
  handleValidationError,
  MenuController.destroy,
)

menuRouter.get(
  '/form',
  menuFormRules(),
  handleValidationError,
  MenuController.form,
)

export default menuRouter
