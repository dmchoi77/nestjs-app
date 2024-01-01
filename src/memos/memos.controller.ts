import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MemosService } from './memos.service';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { CreateMemoDto } from './dto/create-memo.dto';

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

  @Post()
  async createMemo(@Req() req: Request, @Body() dto: CreateMemoDto) {
    await this.memosService.createMemo(req, dto);

    return {
      message: '메모 생성 완료',
      statusCode: 200,
    };
  }
}
