import { body } from 'express-validator'

/**
 * 用户名密码注册/登录
 */
function authUsernamePasswordRules() {
  /**
   * @query username
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
   * @query password
   * @type {string}
   * @description
   * 1. password 参数不能为空
   * 2. password 参数不能小于8位
   */
  const passwordChain = body('password')
    .notEmpty()
    .withMessage('password参数不能为空')
    .bail()

    .isLength({ min: 8 })
    .withMessage('password参数不能小于8位')
    .bail()

  return [
    usernameChain,
    passwordChain,
  ]
}

/**
 * refresh token 验证规则
 */
function authRefreshTokenRules() {
  /**
   * @body token
   * @type {string}
   * @description
   * token 参数不能为空
   */
  const tokenChain = body('token')
    .notEmpty()
    .withMessage('token参数不能为空')
    .bail()

  return [
    tokenChain,
  ]
}

export {
  authUsernamePasswordRules,
  authRefreshTokenRules,
}
