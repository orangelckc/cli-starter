import { body } from 'express-validator'

import { idBodyChain, idQueryChain, keywordChain, statusChain } from './commonRules'

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
 * @body parentId
 * @type {number}
 * @description
 * 1. parentId 参数不能为空
 * 2. 把 parentId 参数转换成整数
 * 3. parentId 参数必须是整数
 * 4. parentId 参数不能小于1
 */
const parentIdChain = body('parentId')
  .notEmpty()
  .withMessage('parentId参数不能为空')
  .bail()

  .toInt()

  .isInt()
  .withMessage('parentId参数必须是整数')
  .bail()

  .isInt({ min: 1 })
  .withMessage('parentId参数不能小于1')
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
 * 创建部门
 * @body {string} name 部门名称
 * @body {number} parentId 父部门ID
 * @body {number} sort 排序
 */
function deptCreateRules() {
  return [nameChain, parentIdChain, sortChain]
}

/**
 * 获取部门列表
 * @query {string} keyword 关键字(部门名称)
 */
function deptListRules() {
  return [keywordChain]
}

/**
 * 更新部门
 * @body {number} id 部门ID
 * @body {string} name 部门名称
 * @body {number} parentId 父部门ID
 * @body {number} sort 排序
 * @body {number} status 状态(0:禁用,1:启用)
 */
function deptUpdateRules() {
  return [idBodyChain, nameChain, parentIdChain, sortChain, statusChain]
}

/**
 * 删除部门
 * @query {number} id 部门ID
 */
function deptDeleteRules() {
  return [idQueryChain]
}

/**
 * 根据部门ID获取部门表单
 * @query {number} id 部门ID
 */
function deptFormRules() {
  return [idQueryChain]
}

export {
  deptCreateRules,
  deptListRules,
  deptUpdateRules,
  deptDeleteRules,
  deptFormRules,
}
