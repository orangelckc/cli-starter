import type { IAdminCreateForm, IAdminData, IAdminListParams, IAdminParams, IAdminUpdateForm, IAdminUpdatePasswordForm, IAdminUpdateStatusForm } from './types.d'
import type { IPaginationResponseData } from '@/api/types'

import request from '@/utils/request'

const prefix = '/admin'

/** 新增后台用户 */
export function addAdminApi(data: IAdminCreateForm) {
  return request({
    url: `${prefix}`,
    method: 'POST',
    data,
  })
}

/** 获取后台用户分页数据 */
export function getAdminListApi(params: IAdminListParams) {
  return request<IPaginationResponseData<IAdminData>>({
    url: `${prefix}/list`,
    method: 'GET',
    params,
  })
}

/** 修改后台用户数据 */
export function updateAdminApi(data: IAdminUpdateForm) {
  return request({
    url: `${prefix}`,
    method: 'PUT',
    data,
  })
}

/** 获取后台用户表单数据 */
export function getAdminFormApi(params: IAdminParams) {
  return request<IAdminData>({
    url: `${prefix}/form`,
    method: 'GET',
    params,
  })
}

/** 删除后台用户 */
export function deleteAdminApi(params: IAdminParams) {
  return request({
    url: `${prefix}`,
    method: 'DELETE',
    params,
  })
}

/** 重置密码 */
export function resetPasswordApi(data: IAdminUpdatePasswordForm) {
  return request({
    url: `${prefix}/password`,
    method: 'PATCH',
    data,
  })
}

/** 修改后台用户状态 */
export function updateAdminStatusApi(data: IAdminUpdateStatusForm) {
  return request({
    url: `${prefix}/status`,
    method: 'PATCH',
    data,
  })
}

export * from './types.d'
