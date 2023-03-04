import { Department } from 'src/entities/Department.entity';
import { Vacation } from 'src/entities/Vacation.entity';
import { Attendance } from 'src/entities/Attendance.entity';
import { User } from 'src/entities/User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserDepartment } from './UserDepartment.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true, default: '' })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Attendance, (attendance) => attendance.company)
  attendances: Attendance[];

  @OneToMany(() => Vacation, (Vacation) => Vacation.company)
  vacations: Vacation[];

  @OneToMany(() => Department, (department) => department.company)
  departments: Department[];

  @OneToMany(() => UserDepartment, (userDepartment) => userDepartment.company)
  userDepartments: UserDepartment[];
}
