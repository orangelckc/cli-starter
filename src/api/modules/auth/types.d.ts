/**
 * ILoginForm, 登录表单
 */
export interface ILoginForm {
    /**
     * 密码
     */
    password: string;
    /**
     * 用户名
     */
    username: string;
}

/**
 * ILoginResult，登录响应对象
 */
export interface ILoginResult {
    /**
     * 访问token
     */
    accessToken: string;
    /**
     * 过期时间（毫秒）
     */
    expires: number;
    /**
     * 刷新token
     */
    refreshToken: string;
}

/**
 * IUserData, 用户信息
 */
export interface IUserData {
    /**
     * 用户头像
     */
    avatar: string;
    /**
     * 按钮权限列表
     */
    permissions: string[];
    /**
     * 用户的角色ID列表
     */
    roles: number[];
    /**
     * 用户id
     */
    uid: number;
    /**
     * 用户名
     */
    username: string;
}