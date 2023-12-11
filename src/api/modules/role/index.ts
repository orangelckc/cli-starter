import type { IRoleCreateForm, IRoleData, IRoleInterfaceForm, IRoleListParams, IRoleMenuAssignForm, IRoleOptionsData, IRoleParams, IRoleUpdateForm, IRoleUpdateStatusForm } from './types.d'
import type { IPaginationResponseData } from '@/api'

import request from '@/utils/request'

const prefix = '/role'

/** 获取角色分页列表 */
export function getRoleListApi(params: IRoleListParams) {
  return request<IPaginationResponseData<IRoleData>>({
    url: `${prefix}/list`,
    method: 'GET',
    params,
  })
}

/** 获取角色下拉列表 */
export function getRoleOptionsApi() {
  return request<IRoleOptionsData[]>({
    url: `${prefix}/options`,
    method: 'GET',
  })
}

/** 删除角色 */
export function deleteRoleApi(params: IRoleParams) {
  return request({
    url: `${prefix}`,
    method: 'DELETE',
    params,
  })
}

/** 创建角色 */
export function addRoleApi(data: IRoleCreateForm) {
  return request({
    url: `${prefix}`,
    method: 'POST',
    data,
  })
}

/** 获取角色表单数据 */
export function getRoleFormApi(params: IRoleParams) {
  return request<IRoleData>({
    url: `${prefix}/form`,
    method: 'GET',
    params,
  })
}

/** 更新角色 */
export function updateRoleApi(data: IRoleUpdateForm) {
  return request({
    url: `${prefix}`,
    method: 'PUT',
    data,
  })
}

/** 更新角色状态 */
export function updateRoleStatusApi(data: IRoleUpdateStatusForm) {
  return request({
    url: `${prefix}/status`,
    method: 'PATCH',
    data,
  })
}

/** 获取角色拥有的菜单 */
export function getRoleMenuApi(params: IRoleParams) {
  return request<number[]>({
    url: `${prefix}/menus`,
    method: 'GET',
    params,
  })
}

/** 获取角色拥有的接口 */
export function getRoleInterfaceApi(params: IRoleParams) {
  return request<number[]>({
    url: `${prefix}/interfaces`,
    method: 'GET',
    params,
  })
}

/** 给角色分配菜单权限 */
export function assignRoleMenuApi(data: IRoleMenuAssignForm) {
  return request({
    url: `${prefix}/menus`,
    method: 'POST',
    data,
  })
}

/** 给角色分配接口权限 */
export function assignRoleInterfaceApi(data: IRoleInterfaceForm) {
  return request({
    url: `${prefix}/interfaces`,
    method: 'POST',
    data,
  })
}

export * from './types.d'
