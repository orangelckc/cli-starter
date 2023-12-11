import { RouteComponent } from "vue-router";

/**
 * IMenuRouteData，路由对象
 */
export interface IMenuRouteData {
    /**
     * 子路由列表
     */
    children?: IMenuRouteData[];
    /**
     * 组件路径
     */
    component?: null | string | RouteComponent;
    meta?: IMenuRouteMetaData;
    /**
     * 路由名称
     */
    name: string;
    /**
     * 相对路由路径
     */
    path: string;
    /**
     * 跳转链接
     */
    redirect?: null | string;
}

/**
 * IMenuRouteMetaData, 路由元数据
 */
export interface IMenuRouteMetaData {
    /**
     * 路由图标
     */
    icon?: null | string;
    /**
     * 是否持久化组件（全是true）
     */
    keepAlive: boolean;
    /**
     * 允许访问的角色列表
     */
    roles: number[];
    /**
     * 路由名称
     */
    title: string;
}

/**
 * IMenuListParams，菜单列表参数
 */
export interface IMenuListParams {
    /**
     * 关键字(菜单名称)
     */
    keyword?: string;
}

/**
 * IMenuData，菜单视图对象
 */
export interface IMenuData {
    /**
     * 子菜单
     */
    children?: IMenuData[];
    /**
     * 组件路径
     */
    component?: null | string;
    /**
     * ICON
     */
    icon?: string;
    /**
     * 菜单ID
     */
    id: number;
    /**
     * 菜单名称
     */
    name?: string;
    /**
     * 父菜单ID
     */
    parentId?: number;
    /**
     * 路由相对路径
     */
    path?: null | string;
    /**
     * 按钮权限标识
     */
    permission?: null | string;
    /**
     * 跳转路径
     */
    redirect?: null | string;
    /**
     * 菜单排序(数字越小排名越靠前)
     */
    sort?: number;
    /**
     * 菜单类型
     */
    type?: number;
    /**
     * 菜单是否可见(1:显示;0:隐藏)
     */
    visible?: number;
}

/**
 * IMenuParams，菜单参数
 */
export interface IMenuParams {
    id: number;
}

/**
 * IMenuStateParams，菜单状态参数
 */
export interface IMenuStateParams extends IMenuParams {
    visible: number;
}

/**
 * IMenuOptionsData，下拉菜单对象
 */
export interface IMenuOptionsData {
    /**
     * 子路由列表
     */
    children?: IMenuOptionsData[];
    /**
     * 菜单ID
     */
    id: number;
    /**
     * 菜单名称
     */
    name: string;
    /**
     * 菜单类型(1-菜单；2-目录；3-按钮权限；4-外链；)
     */
    type: number;
}

/**
 * IMenuCreateForm，菜单表单对象
 */
export interface IMenuCreateForm {
    /**
     * 组件路径(vue页面完整路径，省略.vue后缀)
     */
    component?: string;
    /**
     * 菜单图标
     */
    icon?: string;
    /**
     * 菜单名称
     */
    name: string;
    /**
     * 父菜单ID
     */
    parentId: number;
    /**
     * 路由路径(外链路径)
     */
    path?: string;
    /**
     * 权限标识(操作接口标识，如sys:user:add)
     */
    permission?: string;
    /**
     * 组件的重定向路径
     */
    redirect?: string;
    /**
     * 排序(数字越小排名越靠前)
     */
    sort: number;
    /**
     * 菜单类型(1-菜单；2-目录；3-按钮权限；4-外链；)
     */
    type: number;
}

/**
 * IMenuUpdateForm，菜单视图对象
 */
export interface IMenuUpdateForm {
    /**
     * 组件路径
     */
    component?: string;
    /**
     * ICON
     */
    icon?: string;
    /**
     * 菜单ID
     */
    id: number;
    /**
     * 菜单名称
     */
    name: string;
    /**
     * 父菜单ID
     */
    parentId: number;
    /**
     * 路由路径（外链链接）
     */
    path?: string;
    /**
     * 按钮权限标识
     */
    permission?: string;
    /**
     * 组件的重定向路径
     */
    redirect?: string;
    /**
     * 菜单排序(数字越小排名越靠前)
     */
    sort: number;
    /**
     * 菜单类型
     */
    type: number;
}