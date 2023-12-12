import { Op } from 'sequelize'

import { getMenuIdsByRoleIds } from './menuRoleService'
import { getRoleListByUid } from './userRoleService'

import type { IMenuUpdateForm } from '@/controllers/modules/types/menuController'
import type { ISysMenuModelStatic } from '@/models/types/sysMenu'

import sequelize from '@/loaders/mysql'
import SysMenuModel from '@/models/sysMenu'

const SysMenu = SysMenuModel(sequelize) as ISysMenuModelStatic

/**
 * 通过菜单ID获取菜单信息
 * @param id 菜单ID
 */
export async function getMenuById(id: number) {
  return await SysMenu.findByPk(id, {
    attributes: ['id', 'parentId', 'name', 'type', 'path', 'component', 'permission', 'visible', 'sort', 'icon', 'redirect'],
  })
}

/**
 * 菜单是否存在ById
 * @param id
 */
export async function isMenuExistById(id: number) {
  const menu = await SysMenu.findByPk(id, {
    attributes: ['id'],
  })

  return !!menu
}

/**
 * 菜单是否存在ByIds
 * @param ids
 */
export async function isMenuExistByIds(ids: number[]) {
  const menu = await SysMenu.findAll({
    attributes: ['id'],
    where: {
      id: {
        [Op.in]: ids,
      },
    },
    raw: true,
  })

  return menu.length === ids.length
}

/**
 * 菜单是否存在ByName
 * @param name
 * @param selfId 排除自身
 */
export async function isMenuExistByName(name: string, selfId = -1) {
  const selfWhere = selfId === -1
    ? {}
    : {
        [Op.not]: [{
          id: selfId,
        }],
      }

  const menu = await SysMenu.findOne({
    attributes: ['id'],
    where: {
      name,
      ...selfWhere,
    },
  })

  return !!menu
}

/**
 * 菜单是否存在ByPath
 * @param path
 * @param selfId 排除自身
 */
async function isMenuExistByPath(path: string, selfId = -1) {
  const selfWhere = selfId === -1
    ? {}
    : {
        [Op.not]: [{
          id: selfId,
        }],
      }

  const menu = await SysMenu.findOne({
    attributes: ['id'],
    where: {
      path,
      ...selfWhere,
    },
  })

  return !!menu
}

/**
 * 菜单是否存在ByComponent
 * @param component
 * @param selfId 排除自身
 */
async function isMenuExistByComponent(component: string, selfId = -1) {
  if (component === 'Layout')
    return false

  const selfWhere = selfId === -1
    ? {}
    : {
        [Op.not]: [{
          id: selfId,
        }],
      }

  const menu = await SysMenu.findOne({
    attributes: ['id'],
    where: {
      component,
      ...selfWhere,
    },
  })

  return !!menu
}

/**
 * 菜单是否存在ByPermission
 * @param permission
 * @param selfId 排除自身
 */
async function isMenuExistByPermission(permission: string, selfId = -1) {
  const selfWhere = selfId === -1
    ? {}
    : {
        [Op.not]: [{
          id: selfId,
        }],
      }

  const menu = await SysMenu.findOne({
    attributes: ['id'],
    where: {
      permission,
      ...selfWhere,
    },
  })

  return !!menu
}

/**
 * 菜单是否存在BySort(父菜单下的sort是否存在)
 * @param sort
 */
export async function isMenuExistBySort(sort: number, parentId: number, selfId = -1) {
  const selfWhere = selfId === -1
    ? {}
    : {
        [Op.not]: [{
          id: selfId,
        }],
      }

  const menu = await SysMenu.findOne({
    attributes: ['id'],
    where: {
      sort,
      parentId,
      ...selfWhere,
    },
  })

  return !!menu
}

/**
 * 通过type判断对应的字段是否已经存在
 * 返回 true 表示已经存在
 * 返回 false 表示不存在，且只携带需要的字段数据
 * @param type
 */
export async function isMenuExistByType(data: IMenuUpdateForm) {
  const { id, type, path, component, permission, icon, redirect } = data

  let res = {
    flag: false,
    data: null,
    type: '',
  }

  switch (type) {
    case 1: case 2:
    // 判断 path / component 是否已经存在
      res = {
        flag: (await isMenuExistByPath(path, id)) || (await isMenuExistByComponent(component, id)),
        data: { path, component, icon, redirect },
        type: 'path/component',
      }
      break
    case 3:
      // 判断 permission 是否已经存在
      res = {
        flag: await isMenuExistByPermission(permission, id),
        data: { permission },
        type: 'permission',
      }
      break
    case 4:
      // 判断 redirect 是否已经存在
      res = {
        flag: await isMenuExistByPath(path, id),
        data: { path, icon },
        type: 'redirect',
      }
      break
  }

  return res
}

/**
 * 新增菜单
 * @param data 菜单数据
 * @param transaction 事务
 */
export async function createMenu(data, transaction) {
  return await SysMenu.create(data, {
    transaction,
  })
}

/**
 * 菜单列表
 * @param keyword 关键字
 */
export async function getMenuList(keyword: string) {
  return await SysMenu.findAll({
    attributes: ['id', 'parentId', 'name', 'type', 'path', 'component', 'permission', 'visible', 'sort', 'icon', 'redirect'],
    where: {
      name: {
        [Op.like]: `%${keyword}%`,
      },
    },
    order: [
      ['id', 'ASC'],
      ['type', 'ASC'],
      ['sort', 'ASC'],
    ],
    raw: true,
  })
}

/**
 * 根据ID更新菜单信息
 * @param id 菜单ID
 * @param data 菜单数据
 * @param transaction 事务
 */
export async function updateMenuById(id: number, data, transaction) {
  return await SysMenu.update(data, {
    where: {
      id,
    },
    transaction,
  })
}

/**
 * 根据ID更新菜单状态及子菜单状态
 * @param id 菜单ID
 * @param data 菜单数据
 * @param transaction 事务
 */
export async function updateMenuStatusById(id: number, data, transaction) {
  return await SysMenu.update(data, {
    where: {
      [Op.or]: [{
        id,
      }, {
        parentId: id,
      }],
    },
    transaction,
  })
}

/**
 * 根据用户ID获取菜单路由
 * @param uid 用户ID
 */
export async function getMenuRoutesByUid(uid: number) {
  // 1. 获取用户角色列表
  const roleIds = await getRoleListByUid(uid)

  // 2. 获取角色菜单关系表
  const menuRoleList = await getMenuIdsByRoleIds(roleIds)

  const isSuperAdmin = roleIds.includes(1)

  const optionId = isSuperAdmin
    ? {}
    : {
        id: {
          [Op.in]: menuRoleList.map(menuRole => menuRole.menuId),
        },
      }

  const rows = await SysMenu.findAll({
    attributes: ['id', 'parentId', 'name', 'path', 'component', 'icon', 'redirect', 'visible'],
    where: {
      ...optionId,
      type: {
        [Op.in]: [1, 2, 4],
      },
      visible: 1,
    },
    order: [
      ['id', 'ASC'],
      ['type', 'ASC'],
      ['sort', 'ASC'],
    ],
    raw: true,
  })

  // 处理数据
  const routes = rows.map((item) => {
    const { id, parentId, name, path, component, icon, redirect, visible } = item

    // 获取对应菜单角色关系
    const menuRole = menuRoleList.find(menuRole => menuRole.menuId === id)

    return {
      id,
      name,
      parentId,
      path,
      component,
      redirect,
      meta: {
        visible,
        title: name,
        icon,
        keepAlive: true,
        roles: menuRole?.roleIds ?? [],
      },
    }
  })

  return routes
}

/**
 * 获取菜单下拉表
 */
export async function getMenuOptions() {
  return await SysMenu.findAll({
    attributes: ['id', 'parentId', 'name', 'type'],
    where: {
      visible: 1,
    },
    order: [
      ['id', 'ASC'],
      ['type', 'ASC'],
      ['sort', 'ASC'],
    ],
    raw: true,
  })
}

/**
 * 根据ID判断是否存在子菜单
 * @param id 菜单ID
 */
export async function isExistChildMenuById(id: number) {
  const menu = await SysMenu.findOne({
    attributes: ['id'],
    where: {
      parentId: id,
    },
  })

  return !!menu
}

/**
 * 根据ID删除菜单
 * @param id 菜单ID
 * @param transaction 事务
 */
export async function deleteMenuById(id: number, transaction) {
  return await SysMenu.destroy({
    where: {
      id,
    },
    transaction,
  })
}
