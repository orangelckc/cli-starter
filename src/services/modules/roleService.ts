import { Op } from 'sequelize'

import type { ISysRoleModelStatic } from '@/models/types/sysRole'

import sequelize from '@/loaders/mysql'
import SysRoleModel from '@/models/sysRole'

const SysRole = SysRoleModel(sequelize) as ISysRoleModelStatic

/**
 * 根据id获取角色数据
 * @param id 角色ID
 */
export async function getRoleFormById(id: number) {
  return await SysRole.findByPk(id, {
    attributes: ['id', 'name', 'code', 'sort', 'status'],
  })
}

/**
 * 根据id更新角色数据
 * @param id 角色ID
 */
export async function getRoleById(id: number) {
  return await SysRole.findOne({
    attributes: ['id'],
    where: {
      id,
    },
  })
}

/**
 * 判断角色名称是否存在
 * @param  name 角色名称
 */
export async function getRoleByName(name: string) {
  return await SysRole.findOne({
    attributes: ['id'],
    where: {
      name,
    },
    paranoid: false,
  })
}

/**
 * 判断角色编码是否存在
 * @param  code 角色编码
 */
export async function getRoleByCode(code: string) {
  return await SysRole.findOne({
    attributes: ['id'],
    where: {
      code,
    },
  })
}

/**
 * 判断角色排序是否存在
 * @param  sort 角色排序
 */
export async function getRoleBySort(sort: number) {
  return await SysRole.findOne({
    attributes: ['id'],
    where: {
      sort,
    },
  })
}

/**
 * 新增角色
 * @param data 角色数据
 * @param transaction 事务
 */
export async function createRole(data, transaction) {
  return await SysRole.create(data, { transaction })
}

/**
 * 获取角色列表
 * @param pageNum 页码
 * @param pageSize 每页条数
 * @param keyword 关键字
 */
export async function getRoleList(pageNum: number, pageSize: number, keyword?: string) {
  return await SysRole.findAndCountAll({
    attributes: ['id', 'name', 'code', 'sort', 'status'],
    where: {
      id: {
        [Op.gt]: 1,
      },
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          code: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    },
    order: [
      ['sort', 'ASC'],
    ],
    offset: (pageNum - 1) * pageSize,
    limit: pageSize,
    raw: true,
  })
}

/**
 * 根据id更新角色数据
 * @param id 角色ID
 * @param data 角色数据
 * @param transaction 事务
 */
export async function updateRoleById(id: number, data, transaction) {
  return await SysRole.update(data, {
    where: {
      id,
    },
    transaction,
  })
}

/**
 * 根据id删除角色
 * @param id 角色ID
 * @param transaction 事务
 */
export async function destoryRoleById(id: number, transaction) {
  return await SysRole.destroy({
    where: {
      id,
    },
    transaction,
  })
}

/**
 * 角色下拉列表
 */
export async function getRoleOptions() {
  return await SysRole.findAll({
    attributes: ['id', 'name'],
    where: {
      status: 1,
      id: {
        [Op.gt]: 1,
      },
    },
    order: [
      ['sort', 'ASC'],
    ],
    raw: true,
  })
}

/**
 * 判断某个角色是否有效
 * @param id 角色id
 */
async function isRoleExist(id: number) {
  const role = await SysRole.findByPk(id, {
    attributes: ['id', 'status'],
  })

  if (!role)
    return false

  if (!role.status)
    return false

  return true
}

/**
 * 判断角色数组是否有效
 * @param roleIds 角色id数组
 */
export async function isRoleIdsValid(roleIds: number[]) {
  const isExist = await Promise.all(roleIds.map(isRoleExist))

  return !isExist.includes(false)
}
