import { Router } from 'express'

import { RoleController } from '@/controllers'
import { handleValidationError, roleCreateRules, roleDeleteRules, roleFormRules, roleInterfaceListRules, roleInterfaceRules, roleListRules, roleMenuListRules, roleMenuRules, roleUpdateRules, roleUpdateStatusRules } from '@/validators'

const roleRouter = Router()

roleRouter.post(
  '/',
  roleCreateRules(),
  handleValidationError,
  RoleController.create,
)

roleRouter.get(
  '/list',
  roleListRules(),
  handleValidationError,
  RoleController.list,
)

roleRouter.put(
  '/',
  roleUpdateRules(),
  handleValidationError,
  RoleController.update,
)

roleRouter.patch(
  '/status',
  roleUpdateStatusRules(),
  handleValidationError,
  RoleController.updateStatus,
)

roleRouter.delete(
  '/',
  roleDeleteRules(),
  handleValidationError,
  RoleController.destory,
)

roleRouter.get(
  '/options',
  RoleController.options,
)

roleRouter.post(
  '/menus',
  roleMenuRules(),
  handleValidationError,
  RoleController.setMenus,
)

roleRouter.get(
  '/menus',
  roleMenuListRules(),
  handleValidationError,
  RoleController.getMenus,
)

roleRouter.post(
  '/interfaces',
  roleInterfaceRules(),
  handleValidationError,
  RoleController.setInterfaces,
)

roleRouter.get(
  '/interfaces',
  roleInterfaceListRules(),
  handleValidationError,
  RoleController.getInterfaces,
)

roleRouter.get(
  '/form',
  roleFormRules(),
  handleValidationError,
  RoleController.form,
)

export default roleRouter
