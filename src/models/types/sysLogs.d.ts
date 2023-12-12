import type { BuildOptions, Model } from 'sequelize'

export interface ISysLogsAttributes {
  id: number
  level: string
  message: string
  meta: string
  timestamp: Date
}
export interface ISysLogsModel extends ISysLogsAttributes, Model {}
export type ISysLogsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISysLogsModel
}
