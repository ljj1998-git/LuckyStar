import http from '@/utils/http'

/** @desc 获取图片验证码 */
export function getImageCaptcha() {
  return http.get(`/user/getCaptcha`)
}
