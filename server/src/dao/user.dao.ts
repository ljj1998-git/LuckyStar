import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDao {
  async getUser(id: number) {
    return { id, name: 'luckystar' };
  }
}
