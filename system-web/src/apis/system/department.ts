import http from '@/utils/http'

/** @desc 新增部门 */
export function addDepartmentApi(params: any) {
  return http.post<any[]>(`/department/create`, params)
}

/** 查询部门列表 */
export function getDepartmentListApi(params: any) {
  return http.post<any[]>(`/department/query`, params)
}

/** 查询部门树 */
export function getDepartmentTreeApi(params?: ISearchDepartmentParams) {
  return http.post<IDepartmentTree[]>(`/department/queryTree`, params)
}

/** 查询部门详情 */
export function getDepartmentInfoApi(id: number) {
  return http.get<any>(`/department/info?id=${id}`)
}

/** 删除部门 */
export function deleteDepartmentApi(id: number) {
  return http.del<any>(`/department/delete?id=${id}`)
}

/** 修改部门 */
export function updateDepartmentApi(params: IDepartmentParams) {
  return http.put<any>(`/department/update`, params)
}
