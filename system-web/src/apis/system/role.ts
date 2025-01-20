import http from '@/utils/http'

/** @desc 新增角色 */
export function createRoleApi(params: ICreateRoleParams) {
  return http.post<any>(`/role/create`, params)
}

/** @desc 角色列表 */
export function getRoleListApi(params?: ISearchRoleParams) {
  return http.post<{ list: IRole[]; total: number }>(`/role/list`, params)
}
