import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedRequest } from 'src/types/auth.types';
import { Repository } from 'typeorm';
import { CreateMemoDto } from './dto/create-memo.dto';
import { MemoEntity } from './entities/memo.entity';

@Injectable()
export class MemosService {
  constructor(
    @InjectRepository(MemoEntity)
    private memoRepository: Repository<MemoEntity>,
  ) {}

  async createMemo(req: AuthenticatedRequest, createMemoDto: CreateMemoDto) {
    const { content, date } = createMemoDto;

    const lastMemo = await this.memoRepository.findOne({
      where: { date, user: req.user },
      order: { displayOrder: 'DESC' },
    });

    const newMemo = this.memoRepository.create({
      content,
      date,
      user: req.user,
      displayOrder: lastMemo ? lastMemo.displayOrder + 1 : 0,
    });

    return this.memoRepository.save(newMemo);
  }

  async fetchMemoList(req: AuthenticatedRequest, date: Date) {
    return await this.memoRepository
      .createQueryBuilder('memo')
      .select(['memo.content', 'memo.id'])
      .where({ user: req.user, date: date })
      .getMany();
  }
}
