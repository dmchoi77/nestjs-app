import { Controller, Get, Param, Req } from '@nestjs/common';
import { MemosService } from './memos.service';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@Controller('memos')
export class MemosController {
  constructor(
    private readonly memosService: MemosService,
    private readonly authService: AuthService,
  ) {}

  @Get('/:date')
  async fetchMemoList(@Req() req: Request, @Param('date') date: Date) {
    const memoList = await this.memosService.fetchMemoList(req, date);

    return {
      message: '조회 완료',
      statusCode: 200,
      data: memoList,
    };
  }
}
