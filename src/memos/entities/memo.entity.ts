import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Memo')
export class MemoEntity {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  displayOrder: number;

  @Column({ nullable: false })
  importance: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false, default: false })
  isDeleted: boolean;

  @Column({ nullable: false })
  user: string;
}
