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

enum AttendanceStatus {
  BEGIN = 'begin',
  END = 'end',
}

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  date: DateTime;

  @Column({ type: 'enum', enum: AttendanceStatus })
  status: AttendanceStatus;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: string;

  @ManyToOne(() => User, (user) => user.attendances)
  user: User;
}
