import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedRequest } from 'src/types/auth.types';
import { Repository } from 'typeorm';
import { MemoEntity } from './entities/memo.entity';

@Injectable()
export class MemosService {
  constructor(
    @InjectRepository(MemoEntity)
    private memoRepository: Repository<MemoEntity>,
  ) {}

  async fetchMemoList(req: AuthenticatedRequest, date: Date) {
    return await this.memoRepository
      .createQueryBuilder('memo')
      .select(['memo.content', 'memo.id'])
      .where({ user: req.user, date: date })
      .getMany();
  }
}
