import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MemosService } from './memos.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { User } from 'src/utils/decorators/user';
import { AuthGuard } from 'src/auth.guard';
import { UpdateMemoDto } from './dto/update-memo.dto';

@UseGuards(AuthGuard)
@Controller('memos')
export class MemosController {
  constructor(
    private readonly memosService: MemosService,
    private readonly authService: AuthService,
  ) {}

  @Get('/:date')
  async fetchMemoList(@User() user: string, @Param('date') date: Date) {
    return this.memosService.fetchMemoList(user, date);
  }

  @Post()
  async createMemo(@User() user: string, @Body() dto: CreateMemoDto) {
    return this.memosService.createMemo(user, dto);
  }

  @Post('/delete/:id')
  async deleteMemo(@Param('id') id: number) {
    return this.memosService.deleteMemo(id);
  }

  @Put('/:id')
  async updateMemo(@Param('id') id: string, @Body() dto: UpdateMemoDto) {}
}
