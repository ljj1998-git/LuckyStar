import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs';

/**
 * @description 全局Http异常过滤器
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const resContents = {
      status: statusCode,
      cause: exception?.cause,
      errName: exception?.name,
      message: exception?.message,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: httpAdapter.getRequestUrl(request),
    };

    // 使用不特定于平台（express 或 fastify）的方式（httpAdapter）返回响应内容
    httpAdapter.reply(response, resContents, statusCode);
  }
}
