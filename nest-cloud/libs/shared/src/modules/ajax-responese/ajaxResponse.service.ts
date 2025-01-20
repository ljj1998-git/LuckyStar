import { HttpMessageEnum } from '../../constants/httpMessage';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AjaxResultService {
  success<T>(data?: T, message?: string, status?: number): AjaxResult<T> {
    return AjaxResult.success(
      data,
      (message = message || HttpMessageEnum.SUCCESS),
      (status = status || HttpStatus.OK),
    );
  }

  error<T>(message?: string, status?: number): AjaxResult<T> {
    return AjaxResult.error(
      (message = message || HttpMessageEnum.INTERNAL_SERVER_ERROR),
      (status = status || HttpStatus.INTERNAL_SERVER_ERROR),
    );
  }
}

class AjaxResult<T = any> {
  status: number;
  data?: T;
  message?: string;
  success?: boolean;
  constructor(data: T, status: number, message: string, success: boolean) {
    this.data = data;
    this.status = status;
    this.message = message;
    this.success = success;
  }

  static success<T = any>(
    data?: T,
    msg?: string,
    code?: number,
  ): AjaxResult<T> {
    return new AjaxResult<T>(data, code, msg, true);
  }

  static error<T = null>(msg?: string, status?: number): AjaxResult<T> {
    return new AjaxResult<T>(null, status, msg, false);
  }
}
