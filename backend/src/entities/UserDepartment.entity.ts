import { DateTime } from 'luxon';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Department } from './Department.entity';
import { User } from './User.entity';

@Entity('user_departments')
export class UserDepartment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: DateTime;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: DateTime;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at', nullable: true })
  deletedAt: DateTime;

  @ManyToOne(() => User, (user) => user.userDepartments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Department, (department) => department.userDepartments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
