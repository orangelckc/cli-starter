import { validationResult } from 'express-validator'

import type { NextFunction, Request, Response } from 'express'

import { HttpResponse, HttpStatusCode } from '@/utils'

export function handleValidationError(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const statusCode = HttpStatusCode.BAD_REQUEST
    return res.status(statusCode).json(new HttpResponse({
      success: false,
      message: '接口参数错误',
      data: errors.array(),
    }))
  }
  next()
}

export * from './modules/exampleRules'
export * from './modules/authRules'
export * from './modules/adminRules'
export * from './modules/deptRules'
export * from './modules/roleRules'
export * from './modules/menuRules'
export * from './modules/fileRules'
