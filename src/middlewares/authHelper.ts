import { expressjwt } from 'express-jwt'

import type { Request as JWTRequest } from 'express-jwt'
import type { Algorithm } from 'jsonwebtoken'

import config from '@/config'
import { AdminController, InterfaceController } from '@/controllers'
import { HttpResponse, HttpStatusCode } from '@/utils'

const { secret, algorithm } = config.jwt

const whitelist = []

// 系统白名单
async function getWhiteList() {
  const list = await InterfaceController.whitelist()
  whitelist.push(...list.map(item => `${config.api.prefix}${item}`))
}

getWhiteList()

/**
 * 解析token的中间件
 * @description
 * express-jwt 默认读取 Headers 的 Authorization 字段
 * 获取 Token 并解析后放入 req.auth 中
 *
 * @description
 * ! 启用全局的token控制，除了白名单的接口，其他接口都需要携带token
 */
export function authTokenHelper() {
  return expressjwt({ secret, algorithms: [algorithm as Algorithm], requestProperty: 'auth' })
    .unless({ path: whitelist })
}

/**
 * 验证用户是否有权限访问该资源
 */
export async function authPermission(req: JWTRequest, res, next) {
  try {
    const { path, method } = req

    // 1. 白名单放行
    if (whitelist.includes(`${config.api.prefix}${path}`))
      return next()

    const { uid } = req.auth

    // 2. 验证用户是否被禁用/删除
    const adminValid = await AdminController.validateAdmin(uid)

    if (!adminValid) {
      return res.status(HttpStatusCode.FORBIDDEN).json(new HttpResponse({
        message: '用户不存在或已被禁用',
        success: false,
      }))
    }

    // 3. 验证用户是否有权限访问该接口
    const permissionValid = await InterfaceController.validatePermission(uid, path, method)

    if (!permissionValid) {
      return res.status(HttpStatusCode.FORBIDDEN).json(new HttpResponse({
        message: '无权限访问该资源',
        success: false,
      }))
    }

    next()
  }
  catch (error) {
    return res.status(HttpStatusCode.FORBIDDEN).json(new HttpResponse({
      message: '无权限访问该资源',
      success: false,
    }))
  }
}
