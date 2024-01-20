import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}
  // NestInterceptor 인터페이스의 interceptor 함수 구현
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 요청이 전달 되기 전 로그 출력
    console.log('before..');

    const { method, url, body } = context.getArgByIndex(0);
    this.logger.log(`Request to ${method} ${url}`);

    return next
      .handle()
      .pipe(
        tap((data) =>
          this.logger.log(
            `Response from ${method} ${url} \n response: ${JSON.stringify(
              data,
            )}`,
          ),
        ),
      ); // 요청 처리한 후 로그 출력
  }
}
