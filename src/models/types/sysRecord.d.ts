import type { BuildOptions, Model } from 'sequelize'

export interface ISysRecordAttributes {
  id: number
  type?: string
  uid?: number
  uname?: string
  ip?: string
  api?: string
  client?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface ISysRecordModel extends ISysRecordAttributes, Model {}
export type ISysRecordModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISysRecordModel
}
