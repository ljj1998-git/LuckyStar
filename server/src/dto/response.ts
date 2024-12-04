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
class AjaxResult<T = any> {
  /** 状态码 */
  status: number;

  /** 响应数据 */
  data?: T;

  /** 响应消息 */
  message?: string;

  constructor(data: any, status: number, message: string) {
    this.data = data;
    this.status = status;
    this.message = message;
  }

  /**
   * 返回成功
   * @param data 数据
   * @param msg 消息
   * @returns AjaxResult
   */
  static success<T = any>(
    data?: T,
    msg?: string,
    code?: number,
  ): AjaxResult<T> {
    const status = code || HttpStatus.OK;
    const message = msg || '操作成功';
    return new AjaxResult<T>(data, status, message);
  }

  /**
   * 返回失败
   * @param msg 消息
   * @param status 状态码
   * @returns AjaxResult
   */
  static error<T = null>(msg?: string, status?: number): AjaxResult<T> {
    status = status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = msg || '操作失败';
    return new AjaxResult<T>(null, status, message);
  }
}

@Injectable()
export class HttpResponse<T = any> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<AjaxResult<T>> {
    return next.handle().pipe(
      map((dataOf) => {
        console.log(dataOf);

        if (dataOf) {
          // 设置统一的成功状态码
          const data = dataOf.data;
          const message = dataOf.message;
          const status = dataOf.status == '1' ? 200 : dataOf.status;
          // 设置响应体
          return AjaxResult.success(data, message, status);
        }
      }),
    );
  }
}
