import type { BuildOptions, Model } from 'sequelize'

export interface ISysMenuAttributes {
  id: number
  parentId: number
  name: string
  type?: number
  path?: string
  component?: string
  permission?: string
  visible: number
  sort?: number
  icon?: string
  redirectUrl?: string
  redirect?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface ISysMenuModel extends ISysMenuAttributes, Model {}
export type ISysMenuModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISysMenuModel
}
