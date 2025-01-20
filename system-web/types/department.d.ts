interface ISearchDepartmentParams {
  name?: string
  code?: string
  status?: number
}

interface IDepartmentParams {
  id?: number
  name?: string
  code?: string
  description?: string
  parentId?: number
  status?: number
  sort?: number
}

interface IDepartmentTree {
  /**
   * 子部门
   */
  children?: IDepartmentTree[]
  /**
   * 部门描述
   */
  description?: string
  /**
   * 部门id
   */
  id: number
  /**
   * 部门名称
   */
  name: string
  /**
   * 父级部门id
   */
  parentId: number
  /**
   * 排序
   */
  sort?: number
  /**
   * 状态 1:启用 0:禁用
   */
  status?: boolean
}
