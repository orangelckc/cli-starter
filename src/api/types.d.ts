/** 所有 api 接口的响应数据都应该准守该格式 */
export interface IApiResponseData<T> {
  success: boolean
  data: T
  message: string
}

/** 分页请求的响应数据 */
export interface IPaginationResponseData<T> {
  /**
   * 结果列表
   */
  list: T[]
  /**
   * 总数量
   */
  total: number
}

/** 分页请求的参数 */
export interface PageQuery {
  pageNum: number
  pageSize: number
}

/** 弹窗属性 */
export interface DialogOption {
  /**
   * 弹窗标题
   */
  title?: string
  /**
   * 是否显示
   */
  visible: boolean
}
