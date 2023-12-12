import type { BuildOptions, Model } from 'sequelize'

export interface ISysInterfaceRoleAttributes {
  interfaceId?: number
  roleId?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface ISysInterfaceRoleModel extends ISysInterfaceRoleAttributes, Model {}
export type ISysInterfaceRoleModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISysInterfaceRoleModel
}
