/**
 * AdminCreateForm，新增后台用户表单对象
 */
export interface AdminCreateForm {
  /**
   * 部门ID
   */
  deptId?: number
  /**
   * 密码
   */
  password: string
  /**
   * 备注
   */
  remark: string
  /**
   * 角色ID集合
   */
  roleIds: number[]
  /**
   * 用户名
   */
  username: string
}

/**
 * AdminUpdateForm，更新后台用户表单对象
 */
export interface AdminUpdateForm {
  /**
   * 用户头像
   */
  avatar?: string
  /**
   * 部门ID
   */
  deptId?: number
  /**
   * 个人描述
   */
  description?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 性别
   */
  gender?: number
  /**
   * 手机号
   */
  mobile?: string
  /**
   * 真实姓名
   */
  realname?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 角色ID集合
   */
  roleIds: number[]
  /**
   * 用户ID
   */
  uid: number
  /**
   * 用户名
   */
  username: string
}

/**
 * Request
 *
 * AdminUpdateStatusForm
 */
export interface AdminUpdateStatusForm {
  /**
   * 新的状态值
   */
  status: number
  /**
   * 用户ID
   */
  uid: number
}

/**
 * AdminUpdatePasswordForm
 */
export interface AdminUpdatePasswordForm {
  /**
   * 新密码
   */
  password: string
  /**
   * 用户ID
   */
  uid: number
}
