import type { ISysRoleModelStatic } from '@/models/types/sysRole'
import type { ISysUserRoleModelStatic } from '@/models/types/sysUserRole'
import type { Transaction } from 'sequelize'

import sequelize from '@/loaders/mysql'
import SysRoleModel from '@/models/sysRole'
import SysUserRoleModel from '@/models/sysUserRole'

const SysUserRole = SysUserRoleModel(sequelize) as ISysUserRoleModelStatic
const SysRole = SysRoleModel(sequelize) as ISysRoleModelStatic

SysUserRole.hasMany(SysRole, {
  foreignKey: 'id',
  sourceKey: 'roleId',
})

/**
 * 获取用户角色列表
 * @param uid 用户uid
 */
export async function getRoleListByUid(uid: number) {
  const roles = await SysUserRole.findAll({
    attributes: [],
    where: { userId: uid },
    include: [{
      model: SysRole,
      attributes: ['id'],
      where: { status: 1 },
    }],
    raw: true,
  })

  return roles.map(item => item['sysRoleModels.id'])
}

/**
 * 获取角色用户列表
 * @param roleId 角色id
 */
export async function getUserListByRoleId(roleId: number) {
  return await SysUserRole.findAll({
    attributes: ['userId'],
    where: { roleId },
  })
}

/**
 * 新增用户角色关系
 * @param uid 用户uid
 * @param roleIds 角色id数组
 * @param transaction 事务
 */
export async function createUserRole(uid: number, roleIds: number[], transaction) {
  return await SysUserRole.bulkCreate(
    roleIds.map(roleId => ({
      userId: uid,
      roleId,
    })),
    { transaction },
  )
}

/**
 * 删除用户角色关系
 * !直接硬删除
 * @param uid 用户uid
 * @param transaction 事务
 */
export function deleteUserRoleByUid(uid: number, transaction: Transaction) {
  return SysUserRole.destroy({
    where: {
      userId: uid,
    },
    force: true,
    transaction,
  })
}
