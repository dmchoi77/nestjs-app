import { Controller, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';

@Controller('sse')
export class SseController {
  @Sse()
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { sse: 'test' } }) as MessageEvent),
    );
  }
}
