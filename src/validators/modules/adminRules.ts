import { body, query } from 'express-validator'

import { commonPaginationRules, statusChain } from './commonRules'

/**
 * @body username
 * @type {string}
 * @description
 * 1. username 参数不能为空
 * 2. username 参数必须是字母、数字、下划线、中划线的组合
 * 3. username 参数不能小于4位
 * 4. username 参数不能大于16位
 */
const usernameChain = body('username')
  .notEmpty()
  .withMessage('username参数不能为空')
  .bail()

  .matches(/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*$/)
  .withMessage('username参数必须是字母、数字、下划线、中划线的组合')
  .bail()

  .isLength({ min: 4 })
  .withMessage('username参数不能小于4位')
  .bail()

  .isLength({ max: 16 })
  .withMessage('username参数不能大于16位')
  .bail()

/**
 * @body password
 * @type {string}
 * @description
 * 1. password 参数默认值为rabbit123
 * 2. password 参数不能小于8位
 */
const passwordChain = body('password')
  .default('rabbit123')

  .isLength({ min: 8 })
  .withMessage('password参数不能小于8位')
  .bail()

/**
 * @body deptId
 * @type {number}
 * @description
 * 1. deptId 参数默认值为1
 * 2. deptId 参数必须是数字
 * 3. deptId 参数不能小于1
 */
const deptIdChain = body('deptId')
  .default(1)

  .isInt()
  .withMessage('deptId参数必须是数字')
  .bail()

  .isInt({ min: 1 })
  .withMessage('deptId参数不能小于1')
  .bail()

/**
 * @body roleIds
 * @type {number[]}
 * @description
 * 1. roleIds 参数默认值为[1]
 * 2. roleIds 参数必须是数字数组
 * 3. roleIds 参数不能小于1
 */

const roleIdsChain = body('roleIds')
  .default([])

  .isArray()
  .withMessage('roleIds参数必须是数组')
  .bail()

  .custom((value: number[]) => {
    return value.every((item) => {
      return Number.isInteger(item) && item > 0
    })
  })
  .withMessage('roleIds参数不能小于1')
  .bail()

/**
 * @body remark
 * @type {string}
 * @description
 * 1. remark 参数可以为空
 * 2. remark 参数不为空必须是字符串
 * 3. remark 参数不能大于255位
 */

const remarkChain = body('remark')
  .optional()

  .isString()
  .withMessage('remark参数必须是字符串')
  .bail()

  .isLength({ max: 255 })
  .withMessage('remark参数不能大于255位')
  .bail()

/**
 * @query uid
 * @type {number}
 *  @description
 * 1. uid 参数不能为空
 * 2. uid 参数必须是数字
 * 3. uid 参数不能小于1
 */

const uidQueryChain = query('uid')
  .notEmpty()
  .withMessage('uid参数不能为空')
  .bail()

  .isInt()
  .withMessage('uid参数必须是数字')
  .bail()

  .isInt({ min: 1 })
  .withMessage('uid参数不能小于1')
  .bail()

/**
 * @body uid
 * @type {number}
 * @description
 * 1. uid 参数不能为空
 * 2. uid 参数必须是数字
 * 3. uid 参数不能小于1
 */
const uidBodyChain = body('uid')
  .notEmpty()
  .withMessage('uid参数不能为空')
  .bail()

  .isInt()
  .withMessage('uid参数必须是数字')
  .bail()

  .isInt({ min: 1 })
  .withMessage('uid参数不能小于1')
  .bail()

/**
 * @body gender
 * @type {number}
 * @description
 * 1. gender 参数默认值为0
 * 2. gender 参数必须是数字
 * 3. gender 参数只能是0、1、2
 */
const genderChain = body('gender')
  .default(0)

  .isInt()
  .withMessage('gender参数必须是数字')
  .bail()

  .isInt({ min: 0, max: 2 })
  .withMessage('gender参数只能是0、1、2')
  .bail()

/**
 * @body email
 * @type {string}
 * @description
 * 1. email 参数可以为空
 * 2. email 参数必须是字符串
 * 3. email 参数必须是邮箱格式
 */
const emailChain = body('email')
  .optional()

  .isString()
  .withMessage('email参数必须是字符串')
  .bail()

  .isEmail()
  .withMessage('email参数必须是邮箱格式')
  .bail()

/**
 * @body mobile
 * @type {string}
 * @description
 * 1.mobile 参数可以为空
 * 2. mobile 参数必须是字符串
 * 3. mobile 参数必须是手机号格式
 */
const mobileChain = body('mobile')
  .optional()

  .isString()
  .withMessage('mobile参数必须是字符串')
  .bail()

  .isMobilePhone('zh-CN')
  .withMessage('mobile参数必须是手机号格式')
  .bail()

/**
 * @body avatar
 * @type {string}
 * @description
 * 1. avatar 参数可以为空
 * 2. avatar 参数必须是字符串
 * 2. avatar 参数必须是链接格式
 */
const avatarChain = body('avatar')
  .optional()

  .isString()
  .withMessage('avatar参数必须是字符串')
  .bail()

  .isURL()
  .withMessage('avatar参数必须是链接格式')
  .bail()

/**
 * @body description
 * @type {string}
 * @description
 * 1. description 参数可以为空
 * 2. description 参数必须是字符串
 */
const descriptionChain = body('description')
  .optional()

  .isString()
  .withMessage('description参数必须是字符串')
  .bail()

/**
 * @body realname
 * @type {string}
 * @description
 * 1. realname 参数可以为空
 * 2. realname 参数必须是字符串
 */
const realnameChain = body('realname')
  .optional()

  .isString()
  .withMessage('realname参数必须是字符串')
  .bail()

/**
 * 新增后台用户
 * @body username 用户名
 * @body password 密码
 * @body deptId 部门id
 * @body roleIds 角色id数组
 * @body remark 备注
 */
function adminCreateRules() {
  return [
    usernameChain,
    passwordChain,
    deptIdChain,
    roleIdsChain,
    remarkChain,
  ]
}

/**
 * 获取后台用户列表
 * @query {string} keyword
 */
function adminListRules() {
  /**
   * @query deptId
   * @type {number}
   * @description
   * 1. deptId 参数默认为0
   * 2. deptId 参数转换为数字
   * 3. deptId 参数必须是整数
   * 4. deptId 参数不能小于1
   */

  const deptIdChain = query('deptId')
    .default(0)

    .toInt()

    .isInt()
    .withMessage('deptId参数必须是整数')
    .bail()

    .isInt({ min: 0 })
    .withMessage('deptId参数不能小于0')
    .bail()

  return [...commonPaginationRules(), deptIdChain]
}

/**
 * 更新后台用户
 * @body username 用户名
 * @body deptId 部门id
 * @body roleIds 角色id数组
 * @body remark 备注
 * @body {number} uid
 * @body {number} gender
 * @body {string} email
 * @body {string} mobile
 * @body {string} avatar
 * @body {string} description
 * @body {string} realname
 */
function adminUpdateRules() {
  return [
    usernameChain,
    deptIdChain,
    roleIdsChain,
    remarkChain,
    uidBodyChain,
    genderChain,
    emailChain,
    mobileChain,
    avatarChain,
    descriptionChain,
    realnameChain,
  ]
}

/**
 * 更新后台用户状态
 * @body {number} uid
 * @body {number} status
 */
function adminUpdateStatusRules() {
  return [uidBodyChain, statusChain]
}

/**
 * 删除后台用户
 * @query {number} uid
 */
function adminDeleteRules() {
  return [uidQueryChain]
}

/**
 * 修改后台用户密码
 * @body {number} uid
 * @body {string} password
 */
function adminUpdatePasswordRules() {
  return [uidBodyChain, passwordChain]
}

/**
 * 获取后台用户表单信息
 * @query {number} uid
 */
function adminFormRules() {
  return [uidQueryChain]
}

export {
  adminCreateRules,
  adminListRules,
  adminUpdateRules,
  adminUpdateStatusRules,
  adminDeleteRules,
  adminUpdatePasswordRules,
  adminFormRules,
}
