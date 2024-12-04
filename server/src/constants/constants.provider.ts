import { Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class ConstantsProvider {
  readonly Casbin = {
    /** Casbin配置文件路径 */
    CONFIG_PATH: 'src/config/basic_model.conf',
  };

  /**
   * @description: 响应码
   */
  readonly RESPONSE_CODE = {
    NOSUCCESS: -1, // 表示请求成功，但操作未成功
    SUCCESS: 200, // 请求成功
    BAD_REQUEST: 400, // 请求错误
    UNAUTHORIZED: 401, // 未授权
    FORBIDDEN: 403, // 禁止访问
    NOT_FOUND: 404, // 资源未找到
    INTERNAL_SERVER_ERROR: 500, // 服务器错误
  };

  /**
   * @description: 请求提示语
   */
  readonly RESPONSE_MSG = {
    SUCCESS: '请求成功',
    FAILURE: '请求失败',
  };
}
