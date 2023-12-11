import {PageQuery} from '@/api'

/**
 * IAdminCreateForm，新增用户表单对象
 */
export interface IAdminCreateForm {
    /**
     * 部门ID
     */
    deptId?: number;
    /**
     * 密码
     */
    password?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 角色ID集合
     */
    roleIds?: number[];
    /**
     * 用户名
     */
    username: string;
}

/**
 * IAdminListParams 分页查询参数
 */
export interface IAdminListParams extends PageQuery {
    /**
     * 部门ID
     */
    deptId?: number;
    /**
     * 搜索关键字(用户名/真实姓名/邮箱/手机号)
     */
    keyword?: string;
}

/**
 * IAdminData，用户表单对象
 */
export interface IAdminData {
    /**
     * 用户头像
     */
    avatar?: string;
    /**
     * 部门ID
     */
    deptId?: number | null;
    /**
     * 个人描述
     */
    description?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 性别
     */
    gender?: number;
    /**
     * 手机号
     */
    mobile?: string;
    /**
     * 真实姓名
     */
    realname?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 角色ID集合
     */
    roleIds: number[];
    /**
     * 用户状态(1:正常;0:禁用)
     */
    status: number;
    /**
     * 用户ID
     */
    uid: number;
    /**
     * 用户名
     */
    username: string;
}

/**
 * IAdminUpdateForm，用户表单对象
 */
export interface IAdminUpdateForm {
    /**
     * 用户头像
     */
    avatar?: string;
    /**
     * 部门ID
     */
    deptId: number;
    /**
     * 个人描述
     */
    description?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 性别
     */
    gender?: number;
    /**
     * 手机号
     */
    mobile?: string;
    /**
     * 真实姓名
     */
    realname?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 角色ID集合
     */
    roleIds: number[];
    /**
     * 用户ID
     */
    uid: number;
    /**
     * 用户名
     */
    username: string;
}

/**
 * IAdminParams，部门参数
 */
export interface IAdminParams {
    uid: number;
}

/**
 * IAdminUpdatePasswordForm 修改密码表单对象
 */
export interface IAdminUpdatePasswordForm {
    /**
     * 新密码
     */
    password: string;
    /**
     * 用户ID
     */
    uid: number;
}

/**
 * IAdminUpdateStatusForm 修改状态表单对象
 */
export interface IAdminUpdateStatusForm {
    /**
     * 新的状态值(1:正常;0:禁用)
     */
    status: number;
    /**
     * 用户ID
     */
    uid: number;
}