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
import { UserDepartment } from './UserDepartment.entity';
import { Vacation } from './Vacation.entity';

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

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances: Attendance[];

  @OneToMany(() => Vacation, (vacations) => vacations.user)
  vacations: Vacation[];

  @OneToMany(() => UserDepartment, (userDepartment) => userDepartment.user)
  userDepartments: UserDepartment[];
}
