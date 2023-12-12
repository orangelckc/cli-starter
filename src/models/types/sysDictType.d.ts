import type { BuildOptions, Model } from 'sequelize'

export interface ISysDictTypeAttributes {
  id: number
  name?: string
  code?: string
  status?: number
  remark?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface ISysDictTypeModel extends ISysDictTypeAttributes, Model {}
export type ISysDictTypeModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISysDictTypeModel
}
