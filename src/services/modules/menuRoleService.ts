import { Op } from 'sequelize'

import type { ISysMenuModelStatic } from '@/models/types/sysMenu'
import type { ISysMenuRoleModelStatic } from '@/models/types/sysMenuRole'
import type { ISysRoleModelStatic } from '@/models/types/sysRole'

import sequelize from '@/loaders/mysql'
import SysMenuModel from '@/models/sysMenu'
import SysMenuRoleModel from '@/models/sysMenuRole'
import SysRoleModel from '@/models/sysRole'

const SysMenuRole = SysMenuRoleModel(sequelize) as ISysMenuRoleModelStatic
const SysRole = SysRoleModel(sequelize) as ISysRoleModelStatic
const SysMenu = SysMenuModel(sequelize) as ISysMenuModelStatic

SysMenuRole.hasMany(SysRole, {
  foreignKey: 'id',
  sourceKey: 'roleId',
})

SysMenuRole.hasMany(SysMenu, {
  foreignKey: 'id',
  sourceKey: 'menuId',
})

/**
 * 获取全部菜单对应的角色列表
 */
export async function getAllMenuRoleList() {
  const menuRoleList = await SysMenuRole.findAll({
    attributes: ['menuId', 'roleId'],
  })

  return menuRoleList
}

/**
 * 根据角色ID获取菜单列表
 * @param roleId 角色ID
 */
export async function getMenuListByRoleId(roleId: number) {
  const menuRoleList = await SysMenuRole.findAll({
    attributes: ['menuId'],
    where: {
      roleId,
    },
    order: [['menuId', 'ASC']],
    raw: true,
  })

  return menuRoleList.map(item => item.menuId)
}

/**
 * 根据roleIds获取菜单对应的角色列表
 * @param roleIds 角色ID列表
 */
export async function getMenuIdsByRoleIds(roleIds: number[]) {
  const menuRoleList = await SysMenuRole.findAll({
    attributes: ['menuId', 'roleId'],
    where: {
      roleId: {
        [Op.in]: roleIds,
      },
    },
    raw: true,
  })

  // 相同菜单ID，把角色ID合并
  const list = []
  menuRoleList.forEach((item) => {
    const index = list.findIndex(menuRole => menuRole.menuId === item.menuId)

    if (index === -1) {
      list.push({
        menuId: item.menuId,
        roleIds: [item.roleId],
      })
    }

    else { list[index].roleIds = Array.from(new Set([...list[index].roleIds, item.roleId])) }
  })

  return list
}

/**
 * 根据角色ID删除菜单角色关系
 * @param roleId 角色ID
 * @param transaction 事务
 */
export async function deleteMenuRoleByRoleId(roleId: number, transaction) {
  return await SysMenuRole.destroy({
    where: {
      roleId,
    },
    transaction,
  })
}

/**
 * 创建菜单角色关系
 * @param roleId 角色ID
 * @param menuIds 菜单ID列表
 * @param transaction 事务
 */
export async function createMenuRoles(roleId: number, menuIds: number[], transaction) {
  return await SysMenuRole.bulkCreate(
    menuIds.map(menuId => ({
      roleId,
      menuId,
    })),
    {
      fields: ['roleId', 'menuId'],
      transaction,
    },
  )
}

/**
 * 根据角色ID获取菜单权限列表
 * @param roleIds 角色ID数组
 */
export async function getMenuPermissionsByRoleIds(roleIds: number[]) {
  const isSuperAdmin = roleIds.includes(1)

  if (isSuperAdmin) {
    const permissions = await SysMenu.findAll({
      attributes: ['permission'],
      where: {
        type: 3,
      },
      raw: true,
    })

    return permissions.map(item => item.permission)
  }

  const permissions = await SysMenuRole.findAll({
    attributes: [],
    where: {
      roleId: {
        [Op.in]: roleIds,
      },
    },
    include: [
      {
        model: SysMenu,
        attributes: ['permission'],
        where: {
          type: 3,
        },
      },
    ],
    raw: true,
  })

  return Array.from(new Set(permissions.map(item => item['sysMenuModels.permission'])))
}
