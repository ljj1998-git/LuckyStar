import { Request } from 'express';

/** @description token解析后返回的信息类型 */
export interface CustomRequest extends Request {
  user?: CustomUser;
}

export interface CustomUser {
  id: number;
  username: string;
}
