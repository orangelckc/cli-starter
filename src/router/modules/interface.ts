import { Router } from 'express'

import { InterfaceController } from '@/controllers'

const interfaceRouter = Router()

interfaceRouter.get(
  '/list',
  InterfaceController.list,
)

export default interfaceRouter
