import type { Request as JWTRequest } from 'express-jwt'

/**
 * multer 中间件处理后的数据结构
 */
export interface MulterRequest extends Request {
  auth: JWTRequest['auth']
  file: {
    path: string
    originalname: string
    fieldname: string
    filename: string
    size: number
    destination: string
    encoding: string
    mimetype: string
  }
}
