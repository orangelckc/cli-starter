import type { ISysUserModelStatic } from '@/models/types/sysUser'

import sequelize from '@/loaders/mysql'
import SysUserModel from '@/models/sysUser'

const SysUser = SysUserModel(sequelize) as ISysUserModelStatic

/**
 * 使用用户名查询用户信息
 * @param username 用户名
 */
export async function getUserByUsername(username: string) {
  return await SysUser.findOne({
    attributes: ['id', 'username', 'password', 'avatar', 'status'],
    where: {
      username,
    },
  })
}

/**
 * 使用用户id查询用户信息
 * @param uid 用户id
 */
export async function getUserById(uid: number) {
  return await SysUser.findByPk(uid, {
    attributes: ['id', 'username', 'avatar', 'refreshToken', 'status'],
  })
}

/**
 * 更新用户refreshToken
 * @param uid 用户id
 * @param refreshToken refreshToken
 * @param transaction 事务
 */
export async function updateUserRefreshToken(uid: number, refreshToken: string, transaction) {
  return await SysUser.update({
    refreshToken,
  }, {
    where: {
      id: uid,
    },
    transaction,
  })
}
