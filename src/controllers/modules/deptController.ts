import type { DeptCreateForm, DeptUpdateForm } from './types/deptController'

import sequelize from '@/loaders/mysql'
import { addRecord, createDept, destoryDeptById, getDeptById, getDeptByName, getDeptByParentId, getDeptBySort, getDeptList, getDeptOptions, updateDeptById, validateUserByDeptId } from '@/services'
import { HttpResponse, handleTree } from '@/utils'

/**
 * 新增部门
 */
export async function create(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { name, parentId, sort } = req.body as DeptCreateForm

    // 1. 判断父部门是否存在
    const parentDept = await getDeptById(parentId)

    if (!parentDept) {
      return res.json(new HttpResponse({
        message: '父部门不存在',
        success: false,
      }))
    }

    // 2. 判断部门名称是否已存在
    const deptName = await getDeptByName(name)

    if (deptName !== null) {
      return res.json(new HttpResponse({
        message: '部门名称已存在',
        success: false,
      }))
    }

    // 3. 判断部门排序是否已存在
    const deptSort = await getDeptBySort(sort, parentId)

    if (deptSort !== null) {
      return res.json(new HttpResponse({
        message: '部门排序已存在',
        success: false,
      }))
    }

    // 4. 新增部门
    const data = {
      name,
      parentId,
      treePath: `${parentDept.treePath},${parentId}`,
      sort,
    }

    await createDept(data, transaction)

    // 5. 写入日志
    await addRecord('Add', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '新增部门成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '新增部门失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 查询部门列表
 * @query pageNum 页码
 * @query pageSize 每页数量
 * @query keyword 关键字
 */
export async function list(req, res) {
  try {
    const { keyword } = req.query

    const rows = await getDeptList(keyword)

    const list = !keyword ? handleTree(rows) : rows

    return res.json(new HttpResponse({
      data: list,
      message: '查询部门列表成功',
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '查询部门列表失败',
      success: false,
    }))
  }
}

/**
 * 更新部门
 * @body id 部门ID
 * @body name 部门名称
 * @body parentId 父部门ID
 * @body sort 排序
 * @body status 状态
 */
export async function update(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { id, name, parentId, sort, status } = req.body as DeptUpdateForm

    // 1. 判断部门是否存在
    const dept = await getDeptById(id)

    if (!dept) {
      return res.json(new HttpResponse({
        message: '部门不存在',
        success: false,
      }))
    }

    // 2. 判断父部门是否存在
    const parentDept = await getDeptById(parentId)

    if (!parentDept) {
      return res.json(new HttpResponse({
        message: '父部门不存在',
        success: false,
      }))
    }

    // 3. 判断部门名称是否已存在
    const deptName = await getDeptByName(name)

    if (deptName !== null && deptName.id !== id) {
      return res.json(new HttpResponse({
        message: '部门名称已存在',
        success: false,
      }))
    }

    // 4. 判断部门排序是否已存在
    const deptSort = await getDeptBySort(sort, parentId)

    if (deptSort !== null && deptSort.id !== id) {
      return res.json(new HttpResponse({
        message: '部门排序已存在',
        success: false,
      }))
    }

    // 5. 更新部门
    const data = {
      name,
      parentId,
      treePath: `${parentDept.treePath},${parentId}`,
      sort,
      status,
    }

    await updateDeptById(id, data, transaction)

    // 6. 写入日志
    await addRecord('Update', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '更新部门成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '更新部门失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 删除部门
 * @query id 部门ID
 */
export async function destory(req, res) {
  const transaction = await sequelize.transaction()

  try {
    const { id } = req.query

    // 1. 判断部门是否存在
    const dept = await getDeptById(id)

    if (!dept) {
      return res.json(new HttpResponse({
        message: '部门不存在',
        success: false,
      }))
    }

    // 2. 判断是否存在子部门
    const childDept = await getDeptByParentId(id)

    if (childDept !== null) {
      return res.json(new HttpResponse({
        message: '存在子部门，无法删除',
        success: false,
      }))
    }

    // 3. 判断部门下是否存在用户
    const isExist = await validateUserByDeptId(id)

    if (isExist) {
      return res.json(new HttpResponse({
        message: '部门下存在用户，无法删除',
        success: false,
      }))
    }

    // 4. 删除部门
    await destoryDeptById(id, transaction)

    // 5. 写入日志
    await addRecord('Delete', req, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '删除部门成功',
      success: true,
    }))
  }
  catch (error) {
    await transaction.rollback()

    return res.json(new HttpResponse({
      message: '删除部门失败',
      success: false,
    }))
  }
  finally {
    await transaction.commit()
  }
}

/**
 * 获取部门下拉列表
 */
export async function options(req, res) {
  try {
    const rows = await getDeptOptions()

    const list = handleTree(rows)

    return res.json(new HttpResponse({
      data: list,
      message: '获取部门下拉列表成功',
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取部门下拉列表失败',
      success: false,
    }))
  }
}

/**
 * 根据ID获取部门信息
 * @query id 部门ID
 */
export async function form(req, res) {
  try {
    const { id } = req.query

    const dept = await getDeptById(id)

    if (!dept) {
      return res.json(new HttpResponse({
        message: '部门不存在',
        success: false,
      }))
    }

    return res.json(new HttpResponse({
      data: dept,
      message: '获取部门信息成功',
      success: true,
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      message: '获取部门信息失败',
      success: false,
    }))
  }
}
