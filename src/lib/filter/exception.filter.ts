import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseException } from '../exceptions/base/base.exception';
import { UnCatchedException } from '../exceptions/uncatch.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    // const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException
        ? exception
        : new UnCatchedException(exception);

    const errorMessage = Array.isArray(res.errorMessage)
      ? res.errorMessage[0]
      : res.errorMessage;

    response.status(res.statusCode).json({
      errorCode: 'BAD_REQUEST',
      errorMessage: errorMessage || 'internal server error',
      // errorCode: res.errorCode || UncatchedExceptionCodeEnum.UnCatched,
    });
  }
}
