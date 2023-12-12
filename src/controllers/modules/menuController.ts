import type { IMenuCreateForm, IMenuUpdateForm } from './types/menuController'
import type { Request as JWTRequest } from 'express-jwt'

import sequelize from '@/loaders/mysql'
import { addRecord, createMenu, deleteMenuById, getMenuById, getMenuList, getMenuOptions, getMenuRoutesByUid, isExistChildMenuById, isMenuExistById, isMenuExistByName, isMenuExistBySort, isMenuExistByType, updateMenuById, updateMenuStatusById } from '@/services'
import { HttpResponse, handleTree } from '@/utils'

/**
 * 新增菜单
 * @body {string} parentId 父级菜单ID
 * @body {string} name 菜单名称
 * @body {number} type 菜单类型
 * @body {string} path 路由路径
 * @body {string} component 组件路径
 * @body {string} permission 权限标识
 * @body {number} visible 是否可见
 * @body {number} sort 排序
 * @body {string} icon 菜单图标
 * @body {string} redirect 重定向路径
 */
export async function create(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { parentId, name, type, sort } = req.body as IMenuCreateForm

    // 1. 判断父级菜单是否存在
    if (parentId) {
      const parentMenu = await isMenuExistById(parentId)

      if (!parentMenu) {
        return res.json(new HttpResponse({
          message: '父级菜单不存在',
          success: false,
        }))
      }
    }

    // 2. 判断菜单名称是否已经存在
    const menuName = await isMenuExistByName(name)

    if (menuName) {
      return res.json(new HttpResponse({
        message: '菜单名称已经存在',
        success: false,
      }))
    }

    // 3. 判断 sort 是否已经存在
    const menuSort = await isMenuExistBySort(sort, parentId)

    if (menuSort) {
      return res.json(new HttpResponse({
        message: 'sort已经存在',
        success: false,
      }))
    }

    // 4. 根据 type 判断对应的字段是否已经存在
    const menuType = await isMenuExistByType(req.body)

    if (menuType.flag) {
      return res.json(new HttpResponse({
        message: `${menuType.type}字段值已经存在`,
        success: false,
      }))
    }

    // 4. 新增菜单
    const data = {
      parentId,
      name,
      type,
      sort,
      ...menuType.data,
    }

    await createMenu(data, transaction)

    // 5. 写入日志
    await addRecord('Add', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '新增菜单成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '新增菜单失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 菜单列表
 * @query {string} keyword 关键字
 */
export async function list(req, res) {
  try {
    const { keyword } = req.query

    const rows = await getMenuList(keyword)

    const list = !keyword ? handleTree(rows) : rows

    return res.json(new HttpResponse({
      message: '获取菜单列表成功',
      data: list,
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取菜单列表失败',
      success: false,
    }))
  }
}

/**
 * 更新菜单
 * @body {string} id 菜单ID
 * @body {string} parentId 父级菜单ID
 * @body {string} name 菜单名称
 * @body {number} type 菜单类型
 * @body {string} path 路由路径
 * @body {string} component 组件路径
 * @body {string} permission 权限标识
 * @body {number} visible 是否可见
 * @body {number} sort 排序
 */
export async function update(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { id, parentId, name, sort, type, icon } = req.body as IMenuUpdateForm

    // 1. 判断菜单是否存在
    const menu = await isMenuExistById(id)

    if (!menu) {
      return res.json(new HttpResponse({
        message: '菜单不存在',
        success: false,
      }))
    }

    // 2. 判断父级菜单是否存在
    if (parentId) {
      const parentMenu = await isMenuExistById(parentId)

      if (!parentMenu) {
        return res.json(new HttpResponse({
          message: '父级菜单不存在',
          success: false,
        }))
      }
    }

    // 3. 判断菜单名称是否已经存在
    const menuName = await isMenuExistByName(name, id)

    if (menuName) {
      return res.json(new HttpResponse({
        message: '菜单名称已经存在',
        success: false,
      }))
    }

    // 4. 判断 sort 是否已经存在
    const menuSort = await isMenuExistBySort(sort, parentId, id)

    if (menuSort) {
      return res.json(new HttpResponse({
        message: 'sort已经存在',
        success: false,
      }))
    }

    // 5. 根据 type 判断对应的字段是否已经存在
    const menuType = await isMenuExistByType(req.body)

    if (menuType.flag) {
      return res.json(new HttpResponse({
        message: `${menuType.type}字段值已经存在`,
        success: false,
      }))
    }

    // 6. 更新菜单
    const data = {
      parentId,
      name,
      type,
      sort,
      icon,
      ...menuType.data,
    }

    await updateMenuById(id, data, transaction)

    // 7. 写入日志
    await addRecord('Update', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '更新菜单成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '更新菜单失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 更新菜单状态
 * @query {string} id 菜单ID
 * @query {number} visible 菜单状态
 */
export async function updateVisible(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { id, visible } = req.query

    // 1. 判断菜单是否存在
    const menu = await isMenuExistById(id)

    if (!menu) {
      return res.json(new HttpResponse({
        message: '菜单不存在',
        success: false,
      }))
    }

    // 2. 更新菜单状态， 同时更新子菜单状态
    await updateMenuStatusById(id, { visible }, transaction)

    // 3. 写入日志
    await addRecord('Update', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '更新菜单状态成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '更新菜单状态失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 获取菜单路由，根据用户ID
 */
export async function routes(req: JWTRequest, res) {
  try {
    const { uid } = req.auth

    const rows = await getMenuRoutesByUid(uid)

    const list = handleTree(rows)

    return res.json(new HttpResponse({
      message: '获取菜单路由成功',
      data: filter(list),
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取菜单路由失败',
      success: false,
    }))
  }
}

/**
 * 获取菜单下拉选项
 */
export async function options(req, res) {
  try {
    const rows = await getMenuOptions()

    return res.json(new HttpResponse({
      message: '获取菜单下拉选项成功',
      data: handleTree(rows),
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取菜单下拉选项失败',
      success: false,
    }))
  }
}

/**
 * 删除菜单
 * @query {string} id 菜单ID
 */
export async function destroy(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { id } = req.query

    // 1. 判断菜单是否存在
    const menu = await isMenuExistById(id)

    if (!menu) {
      return res.json(new HttpResponse({
        message: '菜单不存在',
        success: false,
      }))
    }

    // 2. 判断菜单是否有子菜单
    const children = await isExistChildMenuById(id)

    if (children) {
      return res.json(new HttpResponse({
        message: '存在子菜单，不能删除',
        success: false,
      }))
    }

    // 3. 删除菜单
    await deleteMenuById(id, transaction)

    // 4. 写入日志
    await addRecord('Delete', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '删除菜单成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '删除菜单失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 获取菜单表单数据
 * @query {string} id 菜单ID
 */
export async function form(req, res) {
  try {
    const { id } = req.query

    // 2. 获取菜单表单数据
    const menu = await getMenuById(id)

    if (!menu) {
      return res.json(new HttpResponse({
        message: '菜单不存在',
        success: false,
      }))
    }

    return res.json(new HttpResponse({
      message: '获取菜单表单数据成功',
      data: menu,
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取菜单表单数据失败',
      success: false,
    }))
  }
}

/**
 * 递归过滤掉id和parentId字段
 * @param list 菜单列表
 */
function filter(list) {
  return list.map((item) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { id, parentId, children, ...rest } = item

    if (children) {
      rest.children = filter(children)

      return rest
    }

    return rest
  })
}
