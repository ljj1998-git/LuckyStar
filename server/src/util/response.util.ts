import {
  HttpStatus,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * 响应对象
 */
export class AjaxResult<T = any> {
  /** 状态码 */
  status: number;

  /** 响应数据 */
  data?: T;

  /** 响应消息 */
  message?: string;

  /** 响应状态 */
  success?: boolean;

  constructor(data: any, status: number, message: string, success: boolean) {
    this.data = data;
    this.status = status;
    this.message = message;
    this.success = success;
  }

  /**
   * 返回成功
   * @param data 数据
   * @param msg 消息
   * @param code 状态码
   * @returns AjaxResult
   */
  static success<T = any>(
    data?: T,
    msg?: string,
    code?: number,
  ): AjaxResult<T> {
    return new AjaxResult<T>(data, code, msg, true);
  }

  /**
   * 返回失败
   * @param msg 消息
   * @param status 状态码
   * @returns AjaxResult
   */
  static error<T = null>(msg?: string, status?: number): AjaxResult<T> {
    return new AjaxResult<T>(null, status, msg, false);
  }
}

/**
 * @description 响应拦截器
 */
@Injectable()
export class HttpResponse<T = any> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<AjaxResult<T>> {
    return next.handle().pipe(
      map((dataOf) => {
        const response = context.switchToHttp().getResponse(); // 获取原始响应对象
        response.status(HttpStatus.OK);
        if (dataOf) {
          return dataOf;
        }
      }),
    );
  }
}
