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
import { User } from './User.entity';
import { UserDepartment } from './UserDepartment.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  name: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: DateTime;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: DateTime;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at', nullable: true })
  deletedAt: DateTime;

  @OneToMany(
    () => UserDepartment,
    (userDepartment) => userDepartment.department,
  )
  userDepartments: UserDepartment[];
}
