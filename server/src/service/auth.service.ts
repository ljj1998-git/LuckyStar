import { ConstantsProvider } from '@/constants/constants.provider';
import { AuthDao } from '@/dao/auth.dao';
import { Injectable } from '@nestjs/common';
import { Enforcer, newEnforcer } from 'casbin';

@Injectable()
export class AuthService {
  constructor(
    private readonly constants: ConstantsProvider,
    public authDao: AuthDao,
  ) {}
  private enforcerIns: Enforcer;

  async getPermission(
    user: string = '刘俊杰',
    resource: string = '数据1',
    action: string = '管理员',
  ): Promise<any> {
    // 初始化 casbin规则
    await this.initCasbin();

    const res = await this.enforcerIns.enforce(user, resource, action);
    if (res) {
      return 'ok';
    } else {
      return 'error';
    }
  }

  private async initCasbin() {
    try {
      this.enforcerIns = await newEnforcer(this.constants.Casbin.CONFIG_PATH);
      const res = await this.authDao.getCasbinRule();
      console.log(res[0]);
      const policy = res.map((item) => {
        return [item.p1, item.p2, item.p3];
      });
      await this.enforcerIns.addPolicies(policy); //批量添加
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
