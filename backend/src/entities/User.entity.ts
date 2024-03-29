import { Company } from './Company.entity';
import { DateTime } from 'luxon';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Attendance } from './Attendance.entity';
import { UserDepartment } from './UserDepartment.entity';
import { Vacation } from './Vacation.entity';
import { EmailCompanyMapping } from './EmailCompanyMapping.entity';

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

  @Column({
    type: 'varchar',
    name: 'password',
    length: 200,
    nullable: false,
    default: '',
    select: false,
  })
  password?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances: Attendance[];

  @OneToMany(() => Vacation, (vacations) => vacations.user)
  vacations: Vacation[];

  @OneToMany(() => UserDepartment, (userDepartment) => userDepartment.user)
  userDepartments: UserDepartment[];

  @OneToMany(() => EmailCompanyMapping, (a) => a.user)
  emailCompanyMapping?: EmailCompanyMapping[];

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  token?: string;
}
