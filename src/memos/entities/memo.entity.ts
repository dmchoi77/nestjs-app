import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Memo')
export class MemoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: false })
  content: string;

  @Column({ type: 'int', default: () => 0, nullable: false })
  displayOrder: number;

  @Column({ nullable: false, default: 0 })
  importance: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false, default: false })
  isDeleted: boolean;

  @Column({ nullable: false })
  user: string;
}
