import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedRequest } from 'src/types/auth.types';
import { User } from 'src/utils/decorators/user';
import { Repository } from 'typeorm';
import { CreateMemoDto } from './dto/create-memo.dto';
import { MemoEntity } from './entities/memo.entity';

@Injectable()
export class MemosService {
  constructor(
    @InjectRepository(MemoEntity)
    private memoRepository: Repository<MemoEntity>,
  ) {}

  async createMemo(user: string, createMemoDto: CreateMemoDto) {
    const { content, date } = createMemoDto;

    const lastMemo = await this.memoRepository.findOne({
      where: { date, user: user },
      order: { displayOrder: 'DESC' },
    });

    const newMemo = this.memoRepository.create({
      content,
      date,
      user: user,
      displayOrder: lastMemo ? lastMemo.displayOrder + 1 : 0,
    });

    return this.memoRepository.save(newMemo);
  }

  async fetchMemoList(user: string, date: Date) {
    return await this.memoRepository
      .createQueryBuilder('memo')
      .select(['memo.content', 'memo.id'])
      .where({ user: user, date: date })
      .getMany();
  }
}
