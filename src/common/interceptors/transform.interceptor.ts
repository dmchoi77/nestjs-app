import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ServerResponse } from 'http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    // const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse<ServerResponse>();

    return next.handle().pipe(
      map((data) => ({
        status: 'OK',
        data,
        resultMessage: '성공',
      })),
    );
  }
}
