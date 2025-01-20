interface IPage {
  pageNum?: number
  pageSize?: number
}

interface ICommon {
  /** 创建人 */
  createBy?: string
  /** 更新人 */
  updateBy?: string
  /** 创建时间 */
  createAt?: string
  /** 更新时间 */
  updateAt?: string
  /** 是否删除 0-未删除 1-已删除 */
  isDeleted?: number
}

interface IIds {
  ids?: string | number[]
}
