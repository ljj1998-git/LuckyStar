export enum HttpMessageEnum {
  SUCCESS = '请求成功',
  BAD_REQUEST = '参数错误',
  UNAUTHORIZED = 'token失效',
  FORBIDDEN = '无权限访问',
  NOT_FOUND = '资源未找到',
  INTERNAL_SERVER_ERROR = '服务器错误',
}
