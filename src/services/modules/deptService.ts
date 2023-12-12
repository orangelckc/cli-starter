import { Op } from 'sequelize'

import type { ISysDeptModelStatic } from '@/models/types/sysDept'

import sequelize from '@/loaders/mysql'
import SysDeptModel from '@/models/sysDept'

const SysDept = SysDeptModel(sequelize) as ISysDeptModelStatic

/**
 * 根据部门id获取部门信息
 * @param id 部门id
 */
export async function getDeptById(id: number) {
  return await SysDept.findByPk(id, {
    attributes: ['id', 'name', 'parentId', 'sort', 'status', 'treePath'],
  })
}

/**
 * 根据部门名称判断部门是否存在
 * @param name 部门名称
 */
export async function getDeptByName(name: string) {
  return await SysDept.findOne({
    where: {
      name,
    },
  })
}

/**
 * 根据部门排序判断部门是否存在
 * @param sort 部门排序
 * @param parentId 父部门id
 */
export async function getDeptBySort(sort: number, parentId: number) {
  return await SysDept.findOne({
    where: {
      sort,
      parentId,
    },
  })
}

/**
 * 增加部门
 * @param data 部门数据
 * @param transaction 事务
 */
export async function createDept(data, transaction) {
  return await SysDept.create(data, { transaction })
}

/**
 * 获取部门列表
 * @param keyword 关键字
 */
export async function getDeptList(keyword: string) {
  return await SysDept.findAll({
    attributes: ['id', 'name', 'parentId', 'sort', 'status'],
    where: {
      name: {
        [Op.like]: `%${keyword}%`,
      },
    },
    order: [
      ['treePath', 'ASC'], // 按照树形结构排序
      ['sort', 'ASC'],
    ],
    raw: true,
  })
}

/**
 * 根据部门id更新部门信息
 * @param id 部门id
 * @param data 部门数据
 * @param transaction 事务
 */
export async function updateDeptById(id: number, data, transaction) {
  return await SysDept.update(data, {
    where: {
      id,
    },
    transaction,
  })
}

/**
 * 根据父部门id判断是否存在子部门
 * @param id 部门id
 */
export async function getDeptByParentId(id: number) {
  return await SysDept.findOne({
    where: {
      parentId: id,
    },
  })
}

/**
 * 根据部门id删除部门
 * @param id 部门id
 * @param transaction 事务
 */
export async function destoryDeptById(id: number, transaction) {
  return await SysDept.destroy({
    where: {
      id,
    },
    transaction,
  })
}

/**
 * 获取部门下拉列表
 */
export async function getDeptOptions() {
  return await SysDept.findAll({
    attributes: ['id', 'name', 'parentId'],
    where: {
      status: 1,
    },
    order: [
      ['treePath', 'ASC'],
      ['sort', 'ASC'],
    ],
    raw: true,
  })
}
