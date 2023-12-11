import type { IMenuCreateForm, IMenuData, IMenuListParams, IMenuOptionsData, IMenuParams, IMenuRouteData, IMenuStateParams, IMenuUpdateForm } from './types.d'

import request from '@/utils/request'

const prefix = '/menu'

/** 获取用户路由列表 */
export function getUserMenuApi() {
  return request<IMenuRouteData[]>({
    url: `${prefix}`,
    method: 'GET',
  })
}

/** 获取菜单列表 */
export function getMenuListApi(params: IMenuListParams) {
  return request<IMenuData[]>({
    url: `${prefix}/list`,
    method: 'GET',
    params,
  })
}

/** 删除菜单 */
export function deleteMenuApi(params: IMenuParams) {
  return request({
    url: `${prefix}`,
    method: 'DELETE',
    params,
  })
}

/** 获取菜单下拉列表 */
export function getMenuOptionsApi() {
  return request<IMenuOptionsData[]>({
    url: `${prefix}/options`,
    method: 'GET',
  })
}

/** 获取菜单表单数据 */
export function getMenuFormApi(params: IMenuParams) {
  return request<IMenuData>({
    url: `${prefix}/form`,
    method: 'GET',
    params,
  })
}

/** 更新菜单 */
export function updateMenuApi(data: IMenuUpdateForm) {
  return request({
    url: `${prefix}`,
    method: 'PUT',
    data,
  })
}

/** 新增菜单 */
export function addMenuApi(data: IMenuCreateForm) {
  return request({
    url: `${prefix}`,
    method: 'POST',
    data,
  })
}

/** 更新菜单状态 */
export function updateMenuStatusApi(params: IMenuStateParams) {
  return request({
    url: `${prefix}/status`,
    method: 'PATCH',
    params,
  })
}

export * from './types.d'
