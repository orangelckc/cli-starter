import type { RoleCreateForm } from './types/roleController'

import sequelize from '@/loaders/mysql'
import { addRecord, createInterfaceRoles, createMenuRoles, createRole, deleteInterfaceRoleByRoleId, deleteMenuRoleByRoleId, destoryRoleById, getInterfaceListByRoleId, getMenuListByRoleId, getRoleByCode, getRoleById, getRoleByName, getRoleBySort, getRoleFormById, getRoleList, getRoleOptions, getUserListByRoleId, isInterfaceExistByIds, isMenuExistByIds, updateRoleById } from '@/services'
import { HttpResponse } from '@/utils'

/**
 * 新增角色
 * @body {string} name 角色名称
 * @body {string} code 角色编码
 * @body {number} sort 排序
 */
export async function create(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { name, code, sort } = req.body as RoleCreateForm

    // 1. 判断角色名称是否已存在
    const roleName = await getRoleByName(name)

    if (roleName !== null) {
      return res.json(new HttpResponse({
        message: '角色名称已存在',
        success: false,
      }))
    }

    // 2. 判断角色编码是否已存在
    const roleCode = await getRoleByCode(code)

    if (roleCode !== null) {
      return res.json(new HttpResponse({
        message: '角色编码已存在',
        success: false,
      }))
    }

    // 3. 判断角色排序是否已存在
    const roleSort = await getRoleBySort(sort)

    if (roleSort !== null) {
      return res.json(new HttpResponse({
        message: '角色排序已存在',
        success: false,
      }))
    }

    // 4. 新增角色
    const data = {
      name,
      code,
      sort,
    }

    await createRole(data, transaction)

    // 5. 写入日志
    await addRecord('Add', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '新增角色成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '新增角色失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 获取角色分页列表
 * @query {number} pageSize 每页条数
 * @query {number} pageNum 当前页码
 * @query {string} keyword 关键字(角色名称/角色编码)
 */
export async function list(req, res) {
  try {
    const { pageSize, pageNum, keyword } = req.query

    const { count, rows } = await getRoleList(pageNum, pageSize, keyword)

    return res.json(new HttpResponse({
      message: '获取角色分页列表成功',
      success: true,
      data: {
        list: rows,
        total: count,
      },
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取角色分页列表失败',
      success: false,
    }))
  }
}

/**
 * 更新角色
 * @body {number} id 角色ID
 * @body {string} name 角色名称
 * @body {string} code 角色编码
 * @body {number} sort 排序
 * @body {number} status 角色状态
 */
export async function update(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { id, name, code, sort, status } = req.body

    // 0. 不能更新超级管理员
    if (id === 1) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员信息',
        success: false,
      }))
    }

    // 1. 判断角色名称是否已存在
    const roleName = await getRoleByName(name)

    if (roleName !== null && roleName.id !== id) {
      return res.json(new HttpResponse({
        message: '角色名称已存在',
        success: false,
      }))
    }

    // 2. 判断角色编码是否已存在
    const roleCode = await getRoleByCode(code)

    if (roleCode !== null && roleCode.id !== id) {
      return res.json(new HttpResponse({
        message: '角色编码已存在',
        success: false,
      }))
    }

    // 3. 判断角色排序是否已存在
    const roleSort = await getRoleBySort(sort)

    if (roleSort !== null && roleSort.id !== id) {
      return res.json(new HttpResponse({
        message: '角色排序已存在',
        success: false,
      }))
    }

    // 4. 更新角色
    const data = {
      name,
      code,
      sort,
      status,
    }

    await updateRoleById(id, data, transaction)

    // 5. 写入日志
    await addRecord('Update', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '更新角色成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '更新角色失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 更新角色状态
 * @body {number} id 角色ID
 * @body {number} status 角色状态
 */
export async function updateStatus(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { id, status } = req.body

    // 0. 不能更新超级管理员
    if (id === 1) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员信息',
        success: false,
      }))
    }

    // 1. 判断角色是否存在
    const role = await getRoleById(id)

    if (!role) {
      return res.json(new HttpResponse({
        message: '角色不存在',
        success: false,
      }))
    }

    // 2. 更新角色状态
    await updateRoleById(id, { status }, transaction)

    // 3. 写入日志
    await addRecord('Update', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '更新角色状态成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '更新角色状态失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 删除角色
 * @query {number} id 角色ID
 */
export async function destory(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { id } = req.query

    // 0. 不能更新超级管理员
    if (id === 1) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员信息',
        success: false,
      }))
    }

    // 1. 判断角色是否存在
    const role = await getRoleById(id)

    if (!role) {
      return res.json(new HttpResponse({
        message: '角色不存在',
        success: false,
      }))
    }

    // 2. 判断角色是否已分配给用户
    const users = await getUserListByRoleId(id)

    if (users.length) {
      return res.json(new HttpResponse({
        message: '角色已分配给用户，无法删除',
        success: false,
      }))
    }

    // 3. 删除角色
    await destoryRoleById(id, transaction)

    // 4. 写入日志
    await addRecord('Delete', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '删除角色成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '删除角色失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 角色下拉列表
 */
export async function options(req, res) {
  try {
    const rows = await getRoleOptions()

    return res.json(new HttpResponse({
      data: rows,
      message: '获取角色下拉列表成功',
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取角色下拉列表失败',
      success: false,
    }))
  }
}

/**
 * 给角色分配菜单权限
 * @body {number} id 角色ID
 * @body {Array} menuIds 菜单ID数组
 */
export async function setMenus(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { id, menuIds } = req.body

    // 0. 不能更新超级管理员
    if (id === 1) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员信息',
        success: false,
      }))
    }

    // 1. 判断角色是否存在
    const role = await getRoleById(id)

    if (!role) {
      return res.json(new HttpResponse({
        message: '角色不存在',
        success: false,
      }))
    }

    // 2. 判断菜单数组是否都存在
    const menus = await isMenuExistByIds(menuIds)

    if (!menus) {
      return res.json(new HttpResponse({
        message: '存在无效的菜单ID',
        success: false,
      }))
    }

    // 3. 删除角色已分配的权限
    await deleteMenuRoleByRoleId(id, transaction)

    // 4. 给角色分配权限
    await createMenuRoles(id, menuIds, transaction)

    // 5. 写入日志
    await addRecord('Update', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '给角色分配菜单权限成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '给角色分配菜单权限失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 获取角色菜单权限列表
 * @query {number} id 角色ID
 */
export async function getMenus(req, res) {
  try {
    const { id } = req.query

    // 1. 判断角色是否存在
    const role = await getRoleById(id)

    if (!role) {
      return res.json(new HttpResponse({
        message: '角色不存在',
        success: false,
      }))
    }

    // 2. 获取角色权限菜单列表
    const menus = await getMenuListByRoleId(id)

    return res.json(new HttpResponse({
      data: menus,
      message: '获取角色菜单权限列表成功',
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取角色菜单权限列表失败',
      success: false,
    }))
  }
}

/**
 * 获取角色接口列表
 * @query {number} id 角色ID
 */
export async function getInterfaces(req, res) {
  try {
    const { id } = req.query

    // 1. 判断角色是否存在
    const role = await getRoleById(id)

    if (!role) {
      return res.json(new HttpResponse({
        message: '角色不存在',
        success: false,
      }))
    }

    // 2. 获取接口权限列表
    const interfaces = await getInterfaceListByRoleId(id)

    return res.json(new HttpResponse({
      data: interfaces,
      message: '获取角色接口权限列表成功',
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取角色接口权限列表失败',
      success: false,
    }))
  }
}

/**
 * 给角色分配接口权限
 * @body {number} id 角色ID
 * @body {Array} interfaceIds 接口ID数组
 */
export async function setInterfaces(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { id, interfaceIds } = req.body

    // 0. 不能更新超级管理员
    if (id === 1) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员信息',
        success: false,
      }))
    }

    // 1. 判断角色是否存在
    const role = await getRoleById(id)

    if (!role) {
      return res.json(new HttpResponse({
        message: '角色不存在',
        success: false,
      }))
    }

    // 2. 判断接口数组是否都存在
    const isValid = await isInterfaceExistByIds(interfaceIds)

    if (!isValid) {
      return res.json(new HttpResponse({
        message: '存在无效的接口ID',
        success: false,
      }))
    }

    // 3. 删除角色已分配的接口权限
    await deleteInterfaceRoleByRoleId(id, transaction)

    // 4. 给角色分配权限
    await createInterfaceRoles(id, interfaceIds, transaction)

    // 5. 写入日志
    await addRecord('Update', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '给角色分配接口权限成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '给角色分配接口权限失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 获取角色表单数据
 * @query {number} id 角色ID
 */
export async function form(req, res) {
  try {
    const { id } = req.query

    // 1. 判断角色是否存在
    const role = await getRoleFormById(id)

    if (!role) {
      return res.json(new HttpResponse({
        message: '角色不存在',
        success: false,
      }))
    }

    return res.json(new HttpResponse({
      data: role,
      message: '获取角色表单数据成功',
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取角色表单数据失败',
      success: false,
    }))
  }
}
