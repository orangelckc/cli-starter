import type { BuildOptions, Model } from 'sequelize'

export interface ISysUserAttributes {
  id: number
  username?: string
  realname?: string
  mobile?: string
  description?: string
  gender?: number
  avatar?: string
  email?: string
  password?: string
  deptId?: number
  remark?: string
  status?: number
  refreshToken?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface ISysUserModel extends ISysUserAttributes, Model {}
export type ISysUserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISysUserModel
}
