import { DateTime } from 'luxon';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Attendance } from './Attendance.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  firstName: string;

  @Column({ type: 'varchar', length: 200 })
  lastName: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: DateTime;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: DateTime;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: DateTime;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances: Attendance[];
}
