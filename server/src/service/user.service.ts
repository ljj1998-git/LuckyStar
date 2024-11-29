import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  /** 用户注册 */

  async login(id: number) {
    return { id, name: 'luckystar' };
  }
}
