import { Op } from 'sequelize'

import type { ISysUserModelStatic } from '@/models/types/sysUser'

import sequelize from '@/loaders/mysql'
import SysUserModel from '@/models/sysUser'

const SysUser = SysUserModel(sequelize) as ISysUserModelStatic

/**
 * 根据用户名获取用户信息
 * @param username 用户名
 */
export async function getAdminByUsername(username: string) {
  return await SysUser.findOne({
    attributes: ['id'],
    where: {
      username,
    },
  })
}

/**
 * 通过用户id获取用户信息
 * @param id 用户id
 */
export async function getAdminById(id: number) {
  return await SysUser.findByPk(id, {
    attributes: ['id', 'username', 'realname', 'description', 'mobile', 'gender', 'avatar', 'email', 'status', 'deptId', 'remark'],
    raw: true,
  })
}

/**
 * 新增后台用户
 * @param data 新增用户的数据
 * @param transaction 事务
 */
export async function createAdmin(data, transaction) {
  return await SysUser.create(data, { transaction })
}

/**
 * 根据用户id更新用户信息
 * @param id 用户id
 * @param data 更新的数据
 * @param transaction 事务
 */
export async function updateAdminById(id: number, data, transaction) {
  return await SysUser.update(data, {
    where: {
      id,
    },
    transaction,
  })
}

/**
 * 根据用户id删除用户
 * @param id 用户id
 * @param transaction 事务
 */
export async function deleteAdminById(id: number, transaction) {
  return await SysUser.destroy({
    where: {
      id,
    },
    transaction,
  })
}

/**
 * 获取后台用户列表
 * @param pageNum 页码
 * @param pageSize 每页条数
 * @param keyword 关键词
 * @param deptId 部门id
 */
export async function getAdminList(pageNum: number, pageSize: number, keyword?: string, deptId?: number) {
  return await SysUser.findAndCountAll({
    attributes: ['id', 'username', 'realname', 'description', 'mobile', 'gender', 'avatar', 'email', 'status', 'deptId', 'remark'],
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          realname: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          mobile: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
      deptId: {
        [Op.like]: deptId ? `%${deptId}%` : '%%',
      },
    },
    offset: (pageNum - 1) * pageSize,
    limit: pageSize,
    raw: true,
  })
}

/**
 * 验证是否有用户在某个部门
 * @param deptId 部门id
 */
export async function validateUserByDeptId(deptId: number) {
  const user = await SysUser.findOne({
    attributes: ['id'],
    where: {
      deptId,
    },
  })

  return !!user
}
