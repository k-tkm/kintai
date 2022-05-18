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
  date: Date;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'enum', enum: VacationType })
  type: VacationType;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.vacations)
  user: User;
}
