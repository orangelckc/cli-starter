import type { BuildOptions, Model } from 'sequelize'

export interface ISysMenuRoleAttributes {
  menuId: number
  roleId: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface ISysMenuRoleModel extends ISysMenuRoleAttributes, Model {}
export type ISysMenuRoleModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISysMenuRoleModel
}
