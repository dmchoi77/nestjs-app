import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MemosService } from './memos.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { User } from 'src/utils/decorators/user';
import { AuthGuard } from 'src/auth.guard';

@UseGuards(AuthGuard)
@Controller('memos')
export class MemosController {
  constructor(
    private readonly memosService: MemosService,
    private readonly authService: AuthService,
  ) {}

  @Get('/:date')
  async fetchMemoList(@User() user: string, @Param('date') date: Date) {
    const memoList = await this.memosService.fetchMemoList(user, date);

    return {
      message: '조회 완료',
      statusCode: 200,
      data: memoList,
    };
  }

  @Post()
  async createMemo(@User() user: string, @Body() dto: CreateMemoDto) {
    await this.memosService.createMemo(user, dto);

    return {
      message: '메모 생성 완료',
      statusCode: 200,
    };
  }
}
