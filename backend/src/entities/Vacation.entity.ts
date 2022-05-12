import { DateTime } from 'luxon';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User.entity';

enum VacationType {
  PAID = 'begin',
  SICK = 'end',
  CHILDCARE = 'childcare',
  MATERNITY = 'maternity',
}

@Entity('vacations')
export class Vacation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  date: DateTime;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'enum', enum: VacationType })
  type: VacationType;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: DateTime;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: DateTime;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at', nullable: true })
  deletedAt: DateTime;

  @ManyToOne(() => User, (user) => user.vacations)
  user: User;
}
