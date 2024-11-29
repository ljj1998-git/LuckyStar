import { Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class ConstantsProvider {
  readonly Casbin = {
    /** Casbin配置文件路径 */
    CONFIG_PATH: 'src/config/basic_model.conf',
  };
}
