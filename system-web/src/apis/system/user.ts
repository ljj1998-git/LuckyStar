import http from '@/utils/http'

/** @desc 用户登陆 */
export function accountLoginApi(params: IAccountLoginApiParams) {
  return http.post<IAccountLoginApiRes>(`/user/login`, params)
}

/** @desc 查询用户列表 */
export function getUserListApi(params: IGetUserListApiParams) {
  return http.post<IGetUserListApiRes>(`/user/list`, params)
}
