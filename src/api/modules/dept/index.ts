import type { IDeptCreateForm, IDeptData, IDeptListParams, IDeptOptionsData, IDeptParams, IDeptUpdateForm } from './types.d'

import request from '@/utils/request'

const prefix = '/dept'

/** 获取部门下拉选项 */
export function getDeptOptionsApi() {
  return request<IDeptOptionsData[]>({
    url: `${prefix}/options`,
    method: 'GET',
  })
}

/** 获取部门列表 */
export function getDeptListApi(params: IDeptListParams) {
  return request<IDeptData[]>({
    url: `${prefix}/list`,
    method: 'GET',
    params,
  })
}

/** 新增部门 */
export function addDeptApi(data: IDeptCreateForm) {
  return request({
    url: `${prefix}`,
    method: 'POST',
    data,
  })
}

/** 获取部门表单数据 */
export function getDeptFormApi(params: IDeptParams) {
  return request<IDeptData>({
    url: `${prefix}/form`,
    method: 'GET',
    params,
  })
}

/** 修改部门 */
export function updateDeptApi(data: IDeptUpdateForm) {
  return request({
    url: `${prefix}`,
    method: 'PUT',
    data,
  })
}

/** 删除部门 */
export function deleteDeptApi(params: IDeptParams) {
  return request({
    url: `${prefix}`,
    method: 'DELETE',
    params,
  })
}

export * from './types.d'
