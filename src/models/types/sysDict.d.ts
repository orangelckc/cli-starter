import type { BuildOptions, Model } from 'sequelize'

export interface ISysDictAttributes {
  id: number
  typeCode?: string
  name?: string
  value?: string
  sort?: number
  status?: number
  defaulted?: number
  remark?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface ISysDictModel extends ISysDictAttributes, Model {}
export type ISysDictModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISysDictModel
}
