import { Enforcer, newEnforcer } from 'casbin';

/**
 * casbin perm规则 定义一个策略、一个匹配规则，通过请求来的参数和策略进行匹配
 * 获得一个eft影响，进到影响表达式返回一个布尔值
 * p 策略
 * e 影响
 * r 请求
 * m 匹配规则
 */

export default class Permission {
  private static enforcerIns: Enforcer;

  /**
   * 初始化权限实例
   */
  public static async init() {
    try {
      const path_prefix = 'src/bootstrap/casbin'; //默认指向项目根目录,不需要:/
      this.enforcerIns = await newEnforcer(
        `${path_prefix}/basic_model.conf`,
        `${path_prefix}/basic_policy.csv`,
      );

      // 读取mysql数据，并在此处批量添加策略
      // await this.enforcerIns.addPolicy("bob", "data2", "read");		//单个添加
      await this.enforcerIns.addPolicies([['bob', 'data2', 'read']]); //批量添加
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  /**
   * 获取权限
   * @param user 用户
   * @param resource 要访问的资源
   * @param action 权限：read
   */
  public static async getPermission(
    user: string = 'alice',
    resource: string = 'data1',
    action: string = 'read',
  ) {
    const res = await this.enforcerIns.enforce(user, resource, action);
    if (res) {
      return 'ok';
    } else {
      return 'error';
    }
  }
}
