import { Router } from 'express'

import { DeptController } from '@/controllers'
import { deptCreateRules, deptDeleteRules, deptFormRules, deptListRules, deptUpdateRules, handleValidationError } from '@/validators'

const deptRouter = Router()

deptRouter.post(
  '/',
  deptCreateRules(),
  handleValidationError,
  DeptController.create,
)

deptRouter.get(
  '/list',
  deptListRules(),
  handleValidationError,
  DeptController.list,
)

deptRouter.put(
  '/',
  deptUpdateRules(),
  handleValidationError,
  DeptController.update,
)

deptRouter.delete(
  '/',
  deptDeleteRules(),
  handleValidationError,
  DeptController.destory,
)

deptRouter.get(
  '/options',
  DeptController.options,
)

deptRouter.get(
  '/form',
  deptFormRules(),
  handleValidationError,
  DeptController.form,
)

export default deptRouter
