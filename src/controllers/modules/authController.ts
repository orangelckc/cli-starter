import { compareSync } from 'bcrypt'

import type { Request as JWTRequest } from 'express-jwt'

import sequelize from '@/loaders/mysql'
import { addRecord, getMenuPermissionsByRoleIds, getRoleListByUid, getUserById, getUserByUsername, updateUserRefreshToken } from '@/services'
import { HttpResponse, generateAccessToken, generateRefreshToken, validateToken } from '@/utils'

/**
 * 登录
 * @body username 用户名
 * @body password 密码
 */
export async function login(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { username, password } = req.body

    // 1. 根据用户名查询用户
    const user = await getUserByUsername(username)

    if (!user) {
      return res.json(new HttpResponse({
        success: false,
        message: '用户名或密码错误',
      }))
    }

    if (!user.status) {
      return res.json(new HttpResponse({
        success: false,
        message: '用户已被禁用',
      }))
    }

    // 2. 校验密码
    const passwordMatches = await compareSync(password, user.password)

    if (!passwordMatches) {
      return res.json(new HttpResponse({
        success: false,
        message: '用户名或密码错误',
      }))
    }

    // 3. 生成token
    const userInfo = {
      uid: user.id,
      username: user.username,
    }

    const accessToken = generateAccessToken(userInfo)

    const refreshToken = generateRefreshToken(userInfo)

    await updateUserRefreshToken(user.id, refreshToken, transaction)

    // 4 写入登录日志
    await addRecord('Login', req, userInfo, transaction)

    return res.json(new HttpResponse({
      message: '登录成功',
      success: true,
      data: {
        accessToken: accessToken.token,
        expires: accessToken.expires,
        refreshToken,
      },
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '登录失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 登出
 */
export async function logout(req: JWTRequest, res) {
  const transaction = await sequelize.transaction()

  try {
    const { uid } = req.auth

    await updateUserRefreshToken(uid, null, transaction)

    await addRecord('Logout', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '登出成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '登出失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 刷新token
 * @body token refreshToken
 */
export async function refreshToken(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { token } = req.body

    const valid = validateToken(token)

    if (typeof valid === 'string') {
      return res.json(new HttpResponse({
        success: false,
        message: 'refreshToken无效',
      }))
    }

    const user = await getUserById(valid.uid)

    if (!user) {
      return res.json(new HttpResponse({
        success: false,
        message: '用户不存在',
      }))
    }

    if (user.refreshToken !== token) {
      return res.json(new HttpResponse({
        success: false,
        message: 'refreshToken无效',
      }))
    }

    const userInfo = {
      uid: user.id,
      username: user.username,
    }

    const accessToken = generateAccessToken(userInfo)

    const refreshToken = generateRefreshToken(userInfo)

    await updateUserRefreshToken(user.id, refreshToken, transaction)

    // 6. 写入日志
    await addRecord('Update', req, valid, transaction)

    return res.json(new HttpResponse({
      message: '刷新token成功',
      success: true,
      data: {
        accessToken: accessToken.token,
        expires: accessToken.expires,
        refreshToken,
      },
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '刷新token失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 获取登陆用户的信息以及角色、权限列表
 */
export async function getLoginUserInfo(req: JWTRequest, res) {
  try {
    const { uid } = req.auth

    // 1. 判断用户是否存在
    const user = await getUserById(uid)

    if (!user) {
      return res.json(new HttpResponse({
        message: '用户不存在',
        success: false,
      }))
    }

    if (!user.status) {
      return res.json(new HttpResponse({
        message: '用户已被禁用',
        success: false,
      }))
    }

    // 2. 获取用户角色
    const roles = await getRoleListByUid(uid)

    // 3. 获取用户权限
    const permissions = await getMenuPermissionsByRoleIds(roles)

    return res.json(new HttpResponse({
      message: '获取用户信息成功',
      success: true,
      data: {
        uid: user.id,
        username: user.username,
        avatar: user.avatar,
        roles,
        permissions,
      },
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取用户信息失败',
      success: false,
    }))
  }
}
