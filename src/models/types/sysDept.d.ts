import type { BuildOptions, Model } from 'sequelize'

export interface ISysDeptAttributes {
  id: number
  name?: string
  parentId?: number
  treePath?: string
  sort?: number
  status?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface ISysDeptModel extends ISysDeptAttributes, Model {}
export type ISysDeptModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISysDeptModel
}
