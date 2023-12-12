/**
 * IMenuCreateForm，菜单表单对象
 */
export interface IMenuCreateForm {
  /**
   * 组件路径(vue页面完整路径，省略.vue后缀)
   */
  component?: null | string
  /**
   * 菜单图标
   */
  icon?: null | string
  /**
   * 菜单名称
   */
  name: string
  /**
   * 父菜单ID
   */
  parentId: number
  /**
   * 路由路径
   */
  path?: null | string
  /**
   * 权限标识(操作接口标识，如sys:user:add)
   */
  permission?: null | string
  /**
   * 跳转路径
   */
  redirect?: null | string
  /**
   * 排序(数字越小排名越靠前)
   */
  sort?: number
  /**
   * 菜单类型(1-菜单；2-目录；3-按钮权限；4-外链；)
   */
  type: number
}

/**
 * IMenuUpdateForm，菜单视图对象
 */
export interface IMenuUpdateForm {
  /**
   * 组件路径
   */
  component?: null | string
  /**
   * ICON
   */
  icon?: null | string
  /**
   * 菜单ID
   */
  id: number
  /**
   * 菜单名称
   */
  name: string
  /**
   * 父菜单ID
   */
  parentId: number
  /**
   * 路由相对路径
   */
  path?: null | string
  /**
   * 按钮权限标识
   */
  permission?: null | string
  /**
   * 跳转路径
   */
  redirect?: null | string
  /**
   * 菜单排序(数字越小排名越靠前)
   */
  sort: number
  /**
   * 菜单类型
   */
  type: number
}
