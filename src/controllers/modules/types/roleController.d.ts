/**
 * Request
 *
 * RoleCreateForm，角色分页对象
 */
export interface RoleCreateForm {
  /**
   * 角色编码
   */
  code?: string
  /**
   * 角色名称
   */
  name?: string
  /**
   * 排序
   */
  sort?: number
}

/**
 * Request
 *
 * RoleData，角色分页对象
 */
export interface RoleData {
  /**
   * 角色编码
   */
  code?: string
  /**
   * 角色ID
   */
  id?: number
  /**
   * 角色名称
   */
  name?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 角色状态
   */
  status?: number
}
