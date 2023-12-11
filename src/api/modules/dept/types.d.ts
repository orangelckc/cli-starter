/**
 * IDeptOptionsData，部门下拉列表视图对象
 */
export interface IDeptOptionsData {
    /**
     * 子部门
     */
    children?: IDeptOptionsData[];
    /**
     * 部门ID
     */
    id: number;
    /**
     * 部门名称
     */
    name: string;
    /**
     * 父部门ID
     */
    parentId: number;
}

/**
 * IDeptData，部门视图对象
 */
export interface IDeptData {
    /**
     * 子部门
     */
    children?: IDeptData[];
    /**
     * 部门ID
     */
    id: number;
    /**
     * 部门名称
     */
    name: string;
    /**
     * 父部门ID
     */
    parentId: number;
    /**
     * 排序
     */
    sort: number;
    /**
     * 状态(1:启用；0:禁用)
     */
    status: number;
}

/**
 * IDeptListParams，部门列表参数
 *  
 */
export interface IDeptListParams {
    keyword?: string;
}

/**
 * IDeptCreateForm，部门表单对象
 */
export interface IDeptCreateForm {
    /**
     * 部门名称
     */
    name?: string;
    /**
     * 父部门ID
     */
    parentId: number;
    /**
     * 排序(数字越小排名越靠前)
     */
    sort?: number;
}

/**
 * IDeptUpdateForm，部门表单对象
 */
export interface IDeptUpdateForm {
    /**
     * 部门ID
     */
    id: number;
    /**
     * 部门名称
     */
    name: string;
    /**
     * 父部门ID
     */
    parentId: number;
    /**
     * 排序(数字越小排名越靠前)
     */
    sort: number;
    /**
     * 状态(1.启用;0. 禁用)
     */
    status: number;
}

/**
 * IDeptParams，部门参数
 */
export interface IDeptParams {
    id: number;
}