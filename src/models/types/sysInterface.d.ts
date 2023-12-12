import type { BuildOptions, Model } from 'sequelize'

export interface ISysInterfaceAttributes {
  id: number
  path?: string
  method?: string
  name?: string
  public?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface ISysInterfaceModel extends ISysInterfaceAttributes, Model {}
export type ISysInterfaceModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISysInterfaceModel
}
