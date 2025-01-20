import http from '@/utils/http'

/** @desc 用户注册 */
export function accountRegisterApi(params: IAccountRegisterApiParams) {
  return http.post<IAccountRegisterApiRes>(`/user/register`, params)
}

/** @desc 用户登陆 */
export function accountLoginApi(params: IAccountLoginApiParams) {
  return http.post<IAccountLoginApiRes>(`/user/login`, params)
}

/** @dec 更新用户信息 */
export function updateUserApi(params: IUpdateUserInfoApiParams) {
  return http.put<IUpdateUserInfoApiRes>(`/user/update`, params)
}

/** @desc 查询用户列表 */
export function getUserListApi(params: IGetUserListApiParams) {
  return http.post<IGetUserListApiRes>(`/user/list`, params)
}

/** @desc 查询用户详情 */
export function getUserInfoApi(userId: number) {
  return http.get<IGetUserDetailApiRes>(`/user/info?id=${userId}`)
}

/** @desc 删除用户 */
export function deleteUserApi(params: IIds) {
  return http.post(`/user/delete`, params)
}

/** @desc 绑定角色 */
export function bindRoleApi(params: IBindRoleApiParams) {
  return http.post<IBindRoleApiRes>(`/user/bindRole`, params)
}

/** @desc 查看已绑定角色 */
export function getBindRoleApi(userId: number) {
  return http.get<number[]>(`/user/getBindRole?id=${userId}`)
}
