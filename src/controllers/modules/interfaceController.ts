import { getInterfaceList, getInterfaceRoles, getRoleListByUid, getWhiteList } from '@/services'
import { HttpResponse } from '@/utils'

/**
 * 获取接口列表
 */
export async function list(req, res) {
  try {
    const { count, rows } = await getInterfaceList()

    return res.json(new HttpResponse({
      success: true,
      message: '获取全部接口列表成功',
      data: {
        list: rows,
        total: count,
      },
    }))
  }
  catch (error) {
    return res.json(new HttpResponse({
      success: false,
      message: '获取全部接口列表失败',
      data: error,
    }))
  }
}

/**
 * 获取系统白名单
 */
export async function whitelist() {
  try {
    const list = await getWhiteList()

    return list.map(item => item.path)
  }
  catch (error) {
    return []
  }
}

/**
 * 验证用户是否有权限访问接口
 * @param uid 用户id
 * @param path 路径
 */
export async function validatePermission(uid: number, path: string, method: string) {
  try {
    // 1. 获取用户角色
    const userRoles = await getRoleListByUid(uid)

    // 如果用户有超级管理员角色，则直接返回true
    if (userRoles.includes(1))
      return true

    // 2. 获取接口角色
    const interfaceRoles = await getInterfaceRoles(path, method)

    // 3. 判断用户角色和接口角色是否有交集
    const hasPermission = userRoles.some(role => interfaceRoles.includes(role))

    return hasPermission
  }
  catch (error) {
    return false
  }
}
