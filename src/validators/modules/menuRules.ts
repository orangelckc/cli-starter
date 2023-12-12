import { body, query } from 'express-validator'

import { idBodyChain, idQueryChain, keywordChain } from './commonRules'

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
 * 4. parentId 参数不能小于0
 */
const parentIdChain = body('parentId')
  .notEmpty()
  .withMessage('parentId参数不能为空')
  .bail()

  .toInt()

  .isInt()
  .withMessage('parentId参数必须是整数')
  .bail()

  .isInt({ min: 0 })
  .withMessage('parentId参数不能小于0')
  .bail()

/**
 * @body type
 * @type {number}
 * @description
 * 1. type 参数不能为空
 * 2. 把 type 参数转换成整数
 * 3. type 参数必须是整数
 * 4. type 参数只能是 1、2、3、4
 */
const typeChain = body('type')
  .notEmpty()
  .withMessage('type参数不能为空')
  .bail()

  .toInt()

  .isInt()
  .withMessage('type参数必须是整数')
  .bail()

  .isIn([1, 2, 3, 4])
  .withMessage('type参数只能是 1、2、3、4')
  .bail()

/**
 * @body path
 * @type {string}
 * @description
 * 1. 如果 type 参数是 1、2，那么 path 参数不能为空
 * 2. 如果 type 参数是 1、2，那么 path 参数必须是字符串
 */
const pathChain = body('path')
  .custom((value, { req }) => {
    const { type } = req.body
    if (type === 1 || type === 2 || type === 4)
      return !!value

    return true
  })
  .withMessage('path参数不能为空')
  .bail()

  .custom((value, { req }) => {
    const { type } = req.body
    if (type === 1 || type === 2 || type === 4)
      return typeof value === 'string'

    return true
  })
  .withMessage('path参数必须是字符串')
  .bail()

  .custom((value, { req }) => {
    const { type } = req.body
    if (type === 4)
      return value.startsWith('http://') || value.startsWith('https://')

    return true
  })
  .withMessage('path参数必须以http://或者https://开头')
  .bail()

/**
 * @body component
 * @type {string}
 * @description
 * 1. 如果 type 参数是 1,2，那么 component 参数不能为空
 * 2. 如果 type 参数是 1,2，那么 component 参数必须是字符串
 * 3. component 参数结尾不能是.vue
 */
const componentChain = body('component')
  .custom((value, { req }) => {
    const { type } = req.body
    if (type === 1 || type === 2)
      return !!value

    return true
  })
  .withMessage('component参数不能为空')
  .bail()

  .custom((value, { req }) => {
    const { type } = req.body
    if (type === 1 || type === 2)
      return typeof value === 'string'

    return true
  })
  .withMessage('component参数必须是字符串')
  .bail()

  .custom((value, { req }) => {
    const { type } = req.body
    if (type === 1 || type === 2)
      return !value.endsWith('.vue')

    return true
  })
  .withMessage('component参数结尾不需要.vue')
  .bail()

/**
 * @body permission
 * @type {string}
 * @description
 * 1. 如果 type 参数是 3，那么 permission 参数不能为空
 * 2. permission 参数必须是字符串
 */
const permissionChain = body('permission')
  .custom((value, { req }) => {
    const { type } = req.body
    if (type === 3)
      return !!value

    return true
  })
  .withMessage('permission参数不能为空')
  .bail()

  .custom((value, { req }) => {
    const { type } = req.body
    if (type === 3)
      return typeof value === 'string'

    return true
  })
  .withMessage('permission参数必须是字符串')
  .bail()

/**
 * @body visible
 * @type {number}
 * @description
 * 1. visible 参数的默认值是 1
 * 2. 把 visible 参数转换成整数
 * 3. visible 参数必须是整数
 * 4. visible 参数只能是 0、1
 */
const visibleChain = body('visible')
  .default(1)

  .toInt()

  .isInt()
  .withMessage('visible参数必须是整数')
  .bail()

  .isIn([0, 1])
  .withMessage('visible参数只能是 0、1')
  .bail()

/**
 * @body icon
 * @type {string}
 * @description
 * 1. icon 参数可以为空
 * 2. icon 参数必须是字符串
 */
const iconChain = body('icon')
  .optional()

  .isString()
  .withMessage('icon参数必须是字符串')
  .bail()

/**
 * @body redirect
 * @type {string}
 * @description
 * 1. redirect 参数可以为空
 * 2. 如果 type 是 1 或者 2，redirect 参数必须是字符串
 * 3. 如果 type 是 1 或者 2，redirect 参数必须/开头
 */
const redirectChain = body('redirect')
  .optional()

  .custom((value, { req }) => {
    const { type } = req.body
    if (type === 2 || type === 1)
      return typeof value === 'string'

    return true
  })
  .withMessage('redirect参数必须是字符串')
  .bail()

  .custom((value, { req }) => {
    const { type } = req.body
    if (type === 2 || type === 1)
      return value.startsWith('/')

    return true
  })
  .withMessage('redirect参数必须以/开头')
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
 * 创建菜单
 * @body {string} parentId 父级菜单ID
 * @body {string} name 菜单名称
 * @body {number} type 菜单类型
 * @body {string} path 路由路径
 * @body {string} component 组件路径
 * @body {string} permission 权限标识
 * @body {number} visible 是否可见
 * @body {number} sort 排序
 * @body {string} icon 菜单图标
 * @body {string} redirect 重定向路径
 */
function menuCreateRules() {
  return [
    parentIdChain,
    nameChain,
    typeChain,
    pathChain,
    componentChain,
    permissionChain,
    visibleChain,
    iconChain,
    redirectChain,
    sortChain,
  ]
}

/**
 * 菜单列表
 * @query {string} keyword 关键字
 */
function menuListRules() {
  return [
    keywordChain,
  ]
}

/**
 * 更新菜单visible
 * @query {string} id 菜单ID
 * @query {number} visible 是否可见
 */
function menuUpdateVisibleRules() {
  /**
   * @query visible
   * @type {number}
   * @description
   * 1. visible 参数不能为空
   * 2. 把 visible 参数转换成整数
   * 3. visible 参数必须是整数
   * 4. visible 参数只能是 0、1
   */
  const visibleChain = query('visible')
    .notEmpty()
    .withMessage('visible参数不能为空')
    .bail()

    .toInt()

    .isInt()
    .withMessage('visible参数必须是整数')
    .bail()

    .isIn([0, 1])
    .withMessage('visible参数只能是 0、1')
    .bail()
  return [
    idQueryChain,
    visibleChain,
  ]
}

/**
 * 更新菜单信息
 * @body {string} id 菜单ID
 * @body {string} parentId 父级菜单ID
 * @body {string} name 菜单名称
 * @body {number} type 菜单类型
 * @body {string} path 路由路径
 * @body {string} component 组件路径
 * @body {string} permission 权限标识
 * @body {number} sort 排序
 * @body {string} icon 菜单图标
 * @body {string} redirect 重定向路径
 */
function menuUpdateRules() {
  return [
    idBodyChain,
    parentIdChain,
    nameChain,
    typeChain,
    pathChain,
    componentChain,
    permissionChain,
    sortChain,
    iconChain,
    redirectChain,
  ]
}

/**
 * 删除菜单
 * @query {string} id 菜单ID
 */
function menuDestoryRules() {
  return [
    idQueryChain,
  ]
}

/**
 * 获取菜单表单数据
 * @query {string} id 菜单ID
 */
function menuFormRules() {
  return [idQueryChain]
}

export {
  menuCreateRules,
  menuListRules,
  menuUpdateVisibleRules,
  menuUpdateRules,
  menuDestoryRules,
  menuFormRules,
}
