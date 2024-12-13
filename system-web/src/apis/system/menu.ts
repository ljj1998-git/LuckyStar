import http from '@/utils/http'

/** @desc 新增菜单 */
export function createMenuApi(params: IMenuParams) {
  return http.post<IMenuRes>(`/menu/create`, params)
}

/** @desc 查询菜单树 */
export function queryMenuTreeApi() {
  return http.get<IMenuTree[]>(`/menu/queryTree`)
}

/** @desc 查询菜单详情 */
export function queryMenuInfoApi(id: number) {
  return http.get<IMenuTree>(`/menu/info?id=${id}`)
}

/** @desc 更新菜单 */
export function updateMenuApi(params: IMenuParams) {
  return http.put<IMenuRes>(`/menu/update`, params)
}

/** @desc 删除菜单 */
export function deleteMenuApi(id: number) {
  return http.del<IMenuRes>(`/menu/delete?id=${id}`)
}
