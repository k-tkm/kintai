import { Company } from './Company.entity';
import { DateTime } from 'luxon';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Department } from './Department.entity';
import { User } from './User.entity';

@Entity('user_departments')
@Unique(['user', 'department'])
export class UserDepartment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: DateTime;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: DateTime;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
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

  @ManyToOne(() => Company, (company) => company.userDepartments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
