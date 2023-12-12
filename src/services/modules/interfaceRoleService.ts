import type { ISysInterfaceModelStatic } from '@/models/types/sysInterface'
import type { ISysInterfaceRoleModelStatic } from '@/models/types/sysInterfaceRole'
import type { ISysRoleModelStatic } from '@/models/types/sysRole'

import sequelize from '@/loaders/mysql'
import SysInterfaceModel from '@/models/sysInterface'
import SysInterfaceRoleModel from '@/models/sysInterfaceRole'
import SysRoleModel from '@/models/sysRole'

const SysInterface = SysInterfaceModel(sequelize) as ISysInterfaceModelStatic
const SysRole = SysRoleModel(sequelize) as ISysRoleModelStatic
const SysInterfaceRole = SysInterfaceRoleModel(sequelize) as ISysInterfaceRoleModelStatic

SysInterfaceRole.hasMany(SysInterface, {
  foreignKey: 'id',
  sourceKey: 'interfaceId',
})

SysInterfaceRole.hasMany(SysRole, {
  foreignKey: 'id',
  sourceKey: 'roleId',
})

/**
 * 获取接口角色
 * @param path 接口路径
 * @param method 接口方法
 */
export async function getInterfaceRoles(path: string, method: string) {
  const list = await SysInterfaceRole.findAll({
    attributes: ['roleId'],
    include: [
      {
        model: SysInterface,
        attributes: [],
        where: {
          path,
          method,
        },
      },
    ],
    raw: true,
  })

  return list.map(item => item.roleId)
}

/**
 * 根据角色ID删除接口角色关系
 * @param roleId 角色ID
 * @param transaction 事务
 */
export async function deleteInterfaceRoleByRoleId(roleId: number, transaction) {
  return await SysInterfaceRole.destroy({
    where: {
      roleId,
    },
    transaction,
  })
}

/**
 * 创建接口角色关系
 * @param roleId 角色ID
 * @param interfaceIds 接口ID列表
 * @param transaction 事务
 */
export async function createInterfaceRoles(roleId: number, interfaceIds: number[], transaction) {
  return await SysInterfaceRole.bulkCreate(
    interfaceIds.map(interfaceId => ({
      roleId,
      interfaceId,
    })),
    {
      fields: ['roleId', 'interfaceId'],
      transaction,
    },
  )
}

/**
 * 根据角色ID获取接口列表
 * @param roleId 角色ID
 */
export async function getInterfaceListByRoleId(roleId: number) {
  const interfaceRoleList = await SysInterfaceRole.findAll({
    attributes: ['interfaceId'],
    where: {
      roleId,
    },
    order: [['interfaceId', 'ASC']],
    raw: true,
  })

  return interfaceRoleList.map(item => item.interfaceId)
}
