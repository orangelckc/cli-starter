import { IPaginationResponseData, PageQuery } from '@/api';
/**
 * IRoleListParams 角色分页列表参数
 */
export interface IRoleListParams extends PageQuery {
    /**
     * 关键字(角色名称/角色编码)
     */
    keyword?: string;
}

/**
 * IRoleData，角色分页对象
 */
export interface IRoleData  {
    /**
     * 角色编码
     */
    code?: string;
    /**
     * 角色ID
     */
    id: number;
    /**
     * 角色名称
     */
    name?: string;
    /**
     * 排序
     */
    sort?: number;
    /**
     * 角色状态
     */
    status?: number;
}

/**
 * IRoleOptionsData，角色视图对象
 */
export interface IRoleOptionsData {
    /**
     * 角色ID
     */
    id: number;
    /**
     * 角色名称
     */
    name: string;
}

/**
 * IRoleParams，角色参数
 */
export interface IRoleParams {
    id: number;
}

/**
 * IRoleCreateForm，角色创建表单
 */
export interface IRoleCreateForm {
    /**
     * 角色编码
     */
    code?: string;
    /**
     * 角色名称
     */
    name?: string;
    /**
     * 排序
     */
    sort?: number;
}

/**
 * IRoleUpdateForm 角色更新表单
 */
export interface IRoleUpdateForm {
    /**
     * 角色编码
     */
    code?: string;
    /**
     * 角色ID
     */
    id?: number;
    /**
     * 角色名称
     */
    name?: string;
    /**
     * 排序
     */
    sort?: number;
    /**
     * 角色状态
     */
    status?: number;
}

/**
 * IRoleUpdateStatusForm 角色更新状态表单
 */
export interface IRoleUpdateStatusForm {
    /**
     * 角色ID
     */
    id: number;
    /**
     * 新的状态值(1:正常;0:禁用)
     */
    status: number;
}

/**
 * IRoleMenuAssignForm 角色分配菜单表单
 */
export interface IRoleMenuAssignForm {
    /**
     * 角色ID
     */
    id: number;
    /**
     * 菜单ID列表
     */
    menuIds: number[];
}

/**
 * IRoleInterfaceForm 角色分配接口表单
 */
export interface IRoleInterfaceForm {
    /**
     * 角色ID
     */
    id: number;
    /**
     * 接口ID列表
     */
    interfaceIds: number[];
}