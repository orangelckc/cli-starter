import type { ISysRecordModelStatic } from '@/models/types/sysRecord'
import type { Request as JWTRequest } from 'express-jwt'

import sequelize from '@/loaders/mysql'
import SysRecordModel from '@/models/sysRecord'
import { getIpFromRequest } from '@/utils'

const SysRecord = SysRecordModel(sequelize) as ISysRecordModelStatic

enum RecordType {
  Login = '用户登录',
  Logout = '用户登出',
  Add = '新增数据',
  Delete = '删除数据',
  Update = '更新数据',
  Upload = '上传文件',
}

type RecordTypeKey = keyof typeof RecordType

/**
 * 新增日志记录
 * @param type 日志类型
 * @param req Request
 * @param userInfo 用户信息
 * @param transaction 事务
 */
export async function addRecord(type: RecordTypeKey, req: JWTRequest, userInfo, transaction) {
  return await SysRecord.create({
    type: RecordType[type],
    uid: userInfo.uid,
    uname: userInfo.username,
    api: req.url,
    client: req.headers['user-agent'],
    ip: getIpFromRequest(req),
  }, { transaction })
}
