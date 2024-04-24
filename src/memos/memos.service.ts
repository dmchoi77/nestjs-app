import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemoDto } from './dto/create-memo.dto';
import { MemoEntity } from './entities/memo.entity';

@Injectable()
export class MemosService {
  constructor(
    @InjectRepository(MemoEntity)
    private memosRepository: Repository<MemoEntity>,
  ) {}

  async createMemo(user: string, createMemoDto: CreateMemoDto) {
    const { content, date } = createMemoDto;

    const lastMemo = await this.memosRepository.findOne({
      where: { date, user: user },
      order: { displayOrder: 'DESC' },
    });

    const newMemo = this.memosRepository.create({
      content,
      date,
      user: user,
      displayOrder: lastMemo ? lastMemo.displayOrder + 1 : 0,
    });

    return this.memosRepository.save(newMemo);
  }

  fetchMemoList(user: string, date: Date) {
    return this.memosRepository
      .createQueryBuilder('memo')
      .select(['memo.content', 'memo.id'])
      .where({ user: user, date: date })
      .getMany();
  }

  async deleteMemo(memoId: number) {
    const memo = await this.memosRepository.findOne({
      where: { id: memoId },
    });
    if (!memo) throw new NotFoundException('메모가 존재하지 않습니다.');

    await this.memosRepository.delete({ id: memoId });
  }
}
