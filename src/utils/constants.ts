/**
 * 路由前缀
 */
export enum nestRouterPrefix {
  example = '/example',
  auth = '/auth',
  admin = '/admin',
  dept = '/dept',
  role = '/role',
  menu = '/menu',
  interface = '/interface',
  file = '/file',
}

/**
 * 请求api
 */
export enum apis {

}

/**
 * Http请求状态码
 */
export enum HttpStatusCode {
  CONTINUE = 100, // 继续
  SWITCHING_PROTOCOLS = 101, // 切换协议
  PROCESSING = 102, // 处理中
  OK = 200, // 成功
  CREATED = 201, // 已创建
  ACCEPTED = 202, // 已接受
  NON_AUTHORITATIVE_INFORMATION = 203, // 非权威信息
  NO_CONTENT = 204, // 无内容
  RESET_CONTENT = 205, // 重置内容
  PARTIAL_CONTENT = 206, // 部分内容
  MULTI_STATUS = 207, // 多状态
  MULTIPLE_CHOICES = 300, // 多种选择
  MOVED_PERMANENTLY = 301, // 永久移动
  MOVED_TEMPORARILY = 302, // 临时移动
  SEE_OTHER = 303, // 查看其他位置
  NOT_MODIFIED = 304, // 未修改
  USE_PROXY = 305, // 使用代理
  TEMPORARY_REDIRECT = 307, // 临时重定向
  PERMANENT_REDIRECT = 308, // 永久重定向
  BAD_REQUEST = 400, // 错误请求
  UNAUTHORIZED = 401, // 未授权
  PAYMENT_REQUIRED = 402, // 需要付款
  FORBIDDEN = 403, // 禁止
  NOT_FOUND = 404, // 未找到
  METHOD_NOT_ALLOWED = 405, // 方法不允许
  NOT_ACCEPTABLE = 406, // 不可接受
  PROXY_AUTHENTICATION_REQUIRED = 407, // 需要代理身份验证
  REQUEST_TIMEOUT = 408, // 请求超时
  CONFLICT = 409, // 冲突
  GONE = 410, // 已删除
  LENGTH_REQUIRED = 411, // 需要有效长度
  PRECONDITION_FAILED = 412, // 未满足前提条件
  REQUEST_TOO_LONG = 413, // 请求实体过大
  REQUEST_URI_TOO_LONG = 414, // 请求的 URI 过长
  UNSUPPORTED_MEDIA_TYPE = 415, // 不支持的媒体类型
  REQUESTED_RANGE_NOT_SATISFIABLE = 416, // 请求的范围不符合要求
  EXPECTATION_FAILED = 417, // 未满足期望值
  IM_A_TEAPOT = 418, // 我是茶壶
  INSUFFICIENT_SPACE_ON_RESOURCE = 419, // 资源上的空间不足
  METHOD_FAILURE = 420, // 方法失败
  UNPROCESSABLE_ENTITY = 422, // 无法处理的实体
  LOCKED = 423, // 被锁定
  FAILED_DEPENDENCY = 424, // 依赖关系失败
  PRECONDITION_REQUIRED = 428, // 需要前提条件
  TOO_MANY_REQUESTS = 429, // 太多请求
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431, // 请求头字段过大
  INTERNAL_SERVER_ERROR = 500, // 服务器内部错误
  NOT_IMPLEMENTED = 501, // 尚未实施
  BAD_GATEWAY = 502, // 错误网关
  SERVICE_UNAVAILABLE = 503, // 服务不可用
  GATEWAY_TIMEOUT = 504, // 网关超时
  HTTP_VERSION_NOT_SUPPORTED = 505, // HTTP 版本不受支持
  INSUFFICIENT_STORAGE = 507, // 存储空间不足
  NETWORK_AUTHENTICATION_REQUIRED = 511, // 需要网络身份验证
}
