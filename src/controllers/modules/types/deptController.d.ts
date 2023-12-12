/**
 * Request
 *
 * DeptCreateForm，部门表单对象
 */
export interface DeptCreateForm {
  /**
   * 部门名称
   */
  name?: string
  /**
   * 父部门ID
   */
  parentId: number
  /**
   * 排序(数字越小排名越靠前)
   */
  sort?: number
}

/**
 * Request
 *
 * DeptUpdateForm，部门表单对象
 */
export interface DeptUpdateForm {
  /**
   * 部门ID
   */
  id: number
  /**
   * 部门名称
   */
  name: string
  /**
   * 父部门ID
   */
  parentId: number
  /**
   * 排序(数字越小排名越靠前)
   */
  sort: number
  /**
   * 状态(1.启用;0. 禁用)
   */
  status: string
}
