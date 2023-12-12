import { Op } from 'sequelize'

import type { ISysInterfaceModelStatic } from '@/models/types/sysInterface'

import sequelize from '@/loaders/mysql'
import SysInterfaceModel from '@/models/sysInterface'

const SysInterface = SysInterfaceModel(sequelize) as ISysInterfaceModelStatic

/**
 * 获取接口列表
 */
export async function getInterfaceList() {
  return await SysInterface.findAndCountAll({
    attributes: ['id', 'name', 'path', 'method'],
    where: {
      public: 0,
    },
  })
}

/**
 * 获取系统白名单
 */
export async function getWhiteList() {
  return await SysInterface.findAll({
    attributes: ['path'],
    where: {
      public: 1,
    },
    raw: true,
  })
}

/**
 * 接口是否存在ByIds
 * @param ids
 */
export async function isInterfaceExistByIds(ids: number[]) {
  const interfaces = await SysInterface.findAll({
    attributes: ['id'],
    where: {
      id: {
        [Op.in]: ids,
      },
    },
    raw: true,
  })

  return interfaces.length === ids.length
}
