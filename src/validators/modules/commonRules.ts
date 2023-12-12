import { body, query } from 'express-validator'

/**
 * @query id
 * @type {number}
 * @description
 * 1. id 参数不能为空
 * 2. id 参数必须是数字
 * 3. id 参数不能小于1
 */
export const idQueryChain = query('id')
  .notEmpty()
  .withMessage('id参数不能为空')
  .bail()

  .toInt()

  .isInt()
  .withMessage('id参数必须是数字')
  .bail()

  .isInt({ min: 1 })
  .withMessage('id参数不能小于1')
  .bail()

/**
 * @body id
 * @type {number}
 * @description
 * 1. id 参数不能为空
 * 2. id 参数必须是数字
 * 3. id 参数不能小于1
 */
export const idBodyChain = body('id')
  .notEmpty()
  .withMessage('id参数不能为空')
  .bail()

  .toInt()

  .isInt()
  .withMessage('id参数必须是数字')
  .bail()

  .isInt({ min: 1 })
  .withMessage('id参数不能小于1')
  .bail()

/**
 * @query keyword
 * @type {string}
 * @description
 * 1. keyword 参数默认值为空字符串
 * 2. keyword 参数必须是字符串
 */
export const keywordChain = query('keyword')
  .default('')

  .isString()
  .withMessage('keyword参数必须是字符串')
  .bail()

/**
 * @body status
 * @type {number}
 * @description
 * 1. status 参数不能为空
 * 2. status 参数必须是数字
 * 3. status 参数只能是0、1
 */
export const statusChain = body('status')
  .notEmpty()
  .withMessage('status参数不能为空')
  .bail()

  .isInt()
  .withMessage('status参数必须是数字')
  .bail()

  .isInt({ min: 0, max: 1 })
  .withMessage('status参数只能是0、1')
  .bail()

/**
 * 分页参数校验规则
 * @param {string} pageNum
 * @param {string} pageSize
 * @param {string} keyword
 */
function commonPaginationRules() {
  /**
   * @query pageNum
   * @type {string}
   * @description
   * 1. pageNum 参数不能为空
   * 2. 把 pageNum 参数转换成整数
   * 3. pageNum 参数必须是整数
   * 4. pageNum 参数不能小于1
   */
  const pageNumChain = query('pageNum')
    .notEmpty()
    .withMessage('pageNum参数不能为空')
    .bail()

    .toInt()

    .isInt()
    .withMessage('pageNum参数必须是整数')
    .bail()

    .isInt({ min: 1 })
    .withMessage('pageNum参数不能小于1')
    .bail()

  /**
   * @query pageSize
   * @type {string}
   * @description
   * 1. pageSize 参数不能为空
   * 2. 把 pageSize 参数转换成整数
   * 3. pageSize 参数必须是整数
   * 4. pageSize 参数只能是10，30，50
   */
  const pageSizeChain = query('pageSize')
    .notEmpty()
    .withMessage('pageSize参数不能为空')
    .bail()

    .toInt()

    .isInt()
    .withMessage('pageSize参数必须是整数')
    .bail()

    .isIn([10, 30, 50])
    .withMessage('pageSize参数只能是10，30，50')
    .bail()

  return [pageNumChain, pageSizeChain, keywordChain]
}

export {
  commonPaginationRules,
}
