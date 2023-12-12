import { body } from 'express-validator'

import { commonPaginationRules, idBodyChain, idQueryChain, statusChain } from './commonRules'

/**
 * @body name
 * @type {string}
 * @description
 * 1. name 参数不能为空
 * 2. name 参数必须是字符串
 * 3. name 参数长度不能小于2
 */
const nameChain = body('name')
  .notEmpty()
  .withMessage('name参数不能为空')
  .bail()

  .isString()
  .withMessage('name参数必须是字符串')
  .bail()

  .isLength({ min: 2 })
  .withMessage('name参数长度不能小于2')
  .bail()

/**
 * @body code
 * @type {string}
 * @description
 * 1. code 参数不能为空
 * 2. code 参数必须是字符串
 * 3. code 参数长度不能小于2
 * 4. code 参数长度不能大于10
 * 5. code 参数必须是全大写字母
 */
const codeChain = body('code')
  .notEmpty()
  .withMessage('code参数不能为空')
  .bail()

  .isString()
  .withMessage('code参数必须是字符串')
  .bail()

  .isLength({ min: 2 })
  .withMessage('code参数长度不能小于2')
  .bail()

  .isLength({ max: 10 })
  .withMessage('code参数长度不能大于10')
  .bail()

  .isUppercase()
  .withMessage('code参数必须是全大写字母')
  .bail()

/**
 * @body sort
 * @type {number}
 * @description
 * 1. sort 参数不能为空
 * 2. 把 sort 参数转换成整数
 * 3. sort 参数必须是整数
 * 4. sort 参数不能小于1
 */
const sortChain = body('sort')
  .notEmpty()
  .withMessage('sort参数不能为空')
  .bail()

  .toInt()

  .isInt()
  .withMessage('sort参数必须是整数')
  .bail()

  .isInt({ min: 1 })
  .withMessage('sort参数不能小于1')
  .bail()

/**
 * 创建角色
 * @body {string} name 角色名称
 * @body {string} code 角色编码
 * @body {number} sort 排序
 */
function roleCreateRules() {
  return [nameChain, codeChain, sortChain]
}

/**
 * 获取角色列表
 * @query {string} keyword 关键字(角色名称/角色编码)
 */
function roleListRules() {
  return [...commonPaginationRules()]
}

/**
 * 更新角色
 * @body {number} id 角色ID
 * @body {string} name 角色名称
 * @body {string} code 角色编码
 * @body {number} sort 排序
 * @body {number} status 角色状态
 */
function roleUpdateRules() {
  return [idBodyChain, nameChain, codeChain, sortChain, statusChain]
}

/**
 * 更新角色状态
 * @body {number} id 角色ID
 * @body {number} status 角色状态
 */
function roleUpdateStatusRules() {
  return [idBodyChain, statusChain]
}

/**
 * 删除角色
 * @query {number} id 角色ID
 */
function roleDeleteRules() {
  return [idQueryChain]
}

/**
 * 分配角色菜单权限
 * @body {number} id 角色ID
 * @body {Array} menuIds 权限ID数组
 */
function roleMenuRules() {
  /**
   * @body menuIds
   * @type {Array}
   * @description
   * 1. menuIds 参数默认为空数组
   * 2. menuIds 参数必须是数组
   * 3. menuIds 参数必须是非空数组
   * 4. menuIds 参数必须是数字数组
   */
  const menuIdsChain = body('menuIds')
    .default([])

    .isArray()
    .withMessage('menuIds参数必须是数组')
    .bail()

    .custom((value: number[]) => value.every(item => typeof item === 'number'))
    .withMessage('menuIds参数必须是数字数组')
    .bail()

    .custom((value: number[]) => value.every((item, index, array) => array.indexOf(item) === index))
    .withMessage('interfaceIds参数不能重复')
    .bail()

    .custom((value: number[]) => !value.includes(0))
    .withMessage('interfaceIds参数不能包含0')
    .bail()

  return [idBodyChain, menuIdsChain]
}

/**
 * 角色菜单权限列表
 * @query {number} id 角色ID
 */
function roleMenuListRules() {
  return [idQueryChain]
}

/**
 * 角色分配接口权限
 * @body {number} id 角色ID
 * @body {Array} interfaceIds 接口权限ID数组
 */
function roleInterfaceRules() {
  /**
   * @body interfaceIds
   * @type {Array}
   * @description
   * 1. interfaceIds 参数默认为空数组
   * 2. interfaceIds 参数必须是数组
   * 3. interfaceIds 参数必须是非空数组
   * 4. interfaceIds 参数必须是数字数组
   * 5. interfaceIds 参数不能重复
   * 6. interfaceIds 参数不能包含0
   */
  const interfaceIdsChain = body('interfaceIds')
    .default([])

    .isArray()
    .withMessage('interfaceIds参数必须是数组')
    .bail()

    .custom((value: number[]) => value.every(item => typeof item === 'number'))
    .withMessage('interfaceIds参数必须是数字数组')
    .bail()

    .custom((value: number[]) => value.every((item, index, array) => array.indexOf(item) === index))
    .withMessage('interfaceIds参数不能重复')
    .bail()

    .custom((value: number[]) => !value.includes(0))
    .withMessage('interfaceIds参数不能包含0')
    .bail()

  return [idBodyChain, interfaceIdsChain]
}

/**
 * 角色接口权限列表
 * @query {number} id 角色ID
 */
function roleInterfaceListRules() {
  return [idQueryChain]
}

/**
 * 获取角色表单数据
 * @query {number} id 角色ID
 */
function roleFormRules() {
  return [idQueryChain]
}

export {
  roleCreateRules,
  roleListRules,
  roleUpdateRules,
  roleUpdateStatusRules,
  roleDeleteRules,
  roleMenuRules,
  roleMenuListRules,
  roleInterfaceRules,
  roleInterfaceListRules,
  roleFormRules,
}
