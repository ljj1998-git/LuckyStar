import Permission from '@/bootstrap/casbin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async getPermission(): Promise<any> {
    await Permission.init();
    const r: any = Permission.getPermission();
    return r;
  }
}
