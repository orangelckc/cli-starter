import { hashSync } from 'bcrypt'

import type { AdminCreateForm, AdminUpdateForm, AdminUpdatePasswordForm, AdminUpdateStatusForm } from './types/adminController.d'
import type { Request as JWTRequest } from 'express-jwt'

import sequelize from '@/loaders/mysql'
import { addRecord, createAdmin, createUserRole, deleteAdminById, deleteUserRoleByUid, getAdminById, getAdminByUsername, getAdminList, getDeptById, getRoleListByUid, isRoleIdsValid, updateAdminById } from '@/services'
import { HttpResponse } from '@/utils'

/**
 * 新增后台用户
 * @body username 用户名
 * @body password 密码
 * @body deptId 部门id
 * @body roleIds 角色id数组
 * @body remark 备注
 */
export async function create(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { username, password, deptId, roleIds, remark } = req.body as AdminCreateForm

    // 1. 判断用户名是否已存在
    const user = await getAdminByUsername(username)

    if (user !== null) {
      return res.json(new HttpResponse({
        message: '用户名已存在',
        success: false,
      }))
    }

    // 2. 判断部门是否存在
    const dept = await getDeptById(deptId)

    if (!dept) {
      return res.json(new HttpResponse({
        message: '部门不存在',
        success: false,
      }))
    }

    // 3. 判断角色是否存在
    const isValid = await isRoleIdsValid(roleIds)

    if (!isValid) {
      return res.json(new HttpResponse({
        message: '角色不存在',
        success: false,
      }))
    }

    const hashPassword = await hashSync(password, 10)

    // 4. 新增用户
    const data = {
      username,
      password: hashPassword,
      deptId,
      remark,
    }

    const newAdmin = await createAdmin(data, transaction)

    // 5. 新增用户角色关系
    await createUserRole(newAdmin.id, roleIds, transaction)

    // 6 写入日志
    await addRecord('Add', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '新增用户成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '新增用户失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 查询后台用户列表
 * @query pageNum 页码
 * @query pageSize 每页数量
 * @query keyword 关键字
 * @query deptId 部门id
 */
export async function list(req, res) {
  try {
    const { pageNum, pageSize, keyword, deptId } = req.query

    const { count, rows } = await getAdminList(pageNum, pageSize, keyword, deptId)

    const list = []

    for (const row of rows) {
      // 获取用户部门
      const dept = await getDeptById(row.deptId)

      // 获取用户角色
      const roleIds = await getRoleListByUid(row.id)

      const data = {
        uid: row.id,
        deptName: dept.name,
        roleIds,
        ...row,
      }

      delete data.id
      delete data.deptId

      list.push (data)
    }

    return res.json(new HttpResponse({
      data: {
        list,
        total: count,
      },
      message: '查询用户列表成功',
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '查询用户列表失败',
      success: false,
    }))
  }
}

/**
 * 更新后台用户
 * @body uid 用户id
 * @body username 用户名
 * @body deptId 部门id
 * @body roleIds 角色id数组
 * @body remark 备注
 * @body realname 真实姓名
 * @body description 描述
 * @body mobile 手机号
 * @body email 邮箱
 * @body avatar 头像
 */
export async function update(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { uid, username, deptId, roleIds } = req.body as AdminUpdateForm

    // 0. 不能更新超级管理员
    if (uid === 1) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员信息',
        success: false,
      }))
    }

    // 1. 判断用户是否存在, 当被禁用时, 不能更新
    const user = await getAdminById(uid)

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

    // 2. 判断用户名是否已存在
    const userinfo = await getAdminByUsername(username)

    if (userinfo !== null && userinfo.id !== uid) {
      return res.json(new HttpResponse({
        message: '用户名已存在',
        success: false,
      }))
    }

    //  3. 判断部门是否存在
    const dept = await getDeptById(deptId)

    if (!dept) {
      return res.json(new HttpResponse({
        message: '部门不存在',
        success: false,
      }))
    }

    // 4. 判断角色是否存在
    const isValid = await isRoleIdsValid(roleIds)

    if (!isValid) {
      return res.json(new HttpResponse({
        message: '角色不存在',
        success: false,
      }))
    }

    // 5. 更新用户信息
    await updateAdminById(uid, req.body, transaction)

    // 6. 删除用户角色关系
    await deleteUserRoleByUid(uid, transaction)

    // 7. 新增用户角色关系
    await createUserRole(uid, roleIds, transaction)

    // 8. 写入日志
    await addRecord('Update', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '更新用户成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '更新用户失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 修改后台用户状态
 * @body uid 用户id
 * @body status 状态
 */
export async function updateStatus(req: JWTRequest, res) {
  const transaction = await sequelize.transaction()

  try {
    const { uid: authUid } = req.auth
    const { uid, status } = req.body as AdminUpdateStatusForm

    // 0. 不能更新超级管理员
    if (uid === 1) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员信息',
        success: false,
      }))
    }

    // 1. 不能操作自己的状态
    if (authUid === uid) {
      return res.json(new HttpResponse({
        message: '不能操作自己的状态',
        success: false,
      }))
    }

    // 2. 不能修改超级管理员状态
    const isSuper = await getRoleListByUid(uid)

    if (isSuper.includes(1)) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员状态',
        success: false,
      }))
    }

    // 3. 判断用户是否存在
    const user = await getAdminById(uid)

    if (!user) {
      return res.json(new HttpResponse({
        message: '用户不存在',
        success: false,
      }))
    }

    // 4. 更新用户状态
    await updateAdminById(uid, { status }, transaction)

    // 5. 写入日志
    await addRecord('Update', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '更新用户状态成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '更新用户状态失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 删除后台用户
 * @body uid 用户id
 */
export async function destory(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { uid } = req.query

    // 0. 不能更新超级管理员
    if (uid === 1) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员信息',
        success: false,
      }))
    }

    // 1. 判断用户是否存在
    const user = await getAdminById(uid)

    if (!user) {
      return res.json(new HttpResponse({
        message: '用户不存在',
        success: false,
      }))
    }

    // 2. 删除用户
    await deleteAdminById(uid, transaction)

    // 3. 删除用户角色关系
    await deleteUserRoleByUid(uid, transaction)

    // 4. 写入日志
    await addRecord('Delete', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '删除用户成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '删除用户失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 更新后台用户密码
 * @body uid 用户id
 * @body password 密码
 */
export async function updatePassword(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { uid, password } = req.body as AdminUpdatePasswordForm

    // 0. 不能更新超级管理员
    if (uid === 1) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员信息',
        success: false,
      }))
    }

    // 1. 判断用户是否存在
    const user = await getAdminById(uid)

    if (!user) {
      return res.json(new HttpResponse({
        message: '用户不存在',
        success: false,
      }))
    }

    const hashPassword = await hashSync(password, 10)

    // 2. 更新用户密码
    await updateAdminById(uid, { password: hashPassword }, transaction)

    // 3, 写入日志
    await addRecord('Update', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '修改用户密码成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '修改用户密码失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 获取后台用户编辑表单的数据
 * @param uid 用户id
 */
export async function form(req, res) {
  try {
    const { uid } = req.query

    // 0. 不能更新超级管理员
    if (uid === 1) {
      return res.json(new HttpResponse({
        message: '不能修改超级管理员信息',
        success: false,
      }))
    }

    // 1. 判断用户是否存在
    const user = await getAdminById(uid)

    if (!user) {
      return res.json(new HttpResponse({
        message: '用户不存在',
        success: false,
      }))
    }

    // 2. 获取用户信息
    const adminInfo = await getAdminById(uid)

    // 获取用户角色
    const roleIds = await getRoleListByUid(uid)

    const data = {
      uid: adminInfo.id,
      roleIds,
      ...adminInfo,
    }
    delete data.id

    return res.json(new HttpResponse({
      message: '获取用户信息成功',
      success: true,
      data,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取用户信息失败',
      success: false,
    }))
  }
}

/**
 * 验证后台用户是否有效
 * @param uid 用户id
 */
export async function validateAdmin(uid: number) {
  const user = await getAdminById(uid)

  if (!user)
    return false

  if (!user.status)
    return false

  return true
}
