import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/Department.entity';
import { UserDepartment } from 'src/entities/UserDepartment.entity';
import { Repository } from 'typeorm';
import type { CreateDepartmentDto } from './Dto/CreateDepartmentDto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,

    @InjectRepository(UserDepartment)
    private userDepartmentsRepository: Repository<UserDepartment>,
  ) {}

  getDepartments(): Promise<Department[]> {
    return this.departmentsRepository.find({
      relations: ['userDepartments', 'userDepartments.user'],
    });
  }

  getDepartmentDetail(departmentID: number): Promise<Department> {
    return this.departmentsRepository.findOne(departmentID, {
      relations: ['userDepartments', 'userDepartments.user'],
    });
  }

  async createDepartment(
    departmentData: CreateDepartmentDto,
  ): Promise<Department> {
    const isExist = !!(await this.departmentsRepository.findOne({
      name: departmentData.name,
    }));

    if (isExist) {
      throw new HttpException(
        {
          statusCode: 409,
          error: '既に作成されている部署名です。',
        },
        409,
      );
    }

    const department = await this.departmentsRepository.save({
      name: departmentData.name,
    });

    const userDepartments: UserDepartment[] = [];
    if (departmentData.users) {
      for (const user of departmentData.users) {
        userDepartments.push(
          await this.userDepartmentsRepository.save({
            department: department,
            user: user,
          }),
        );
      }
    }

    return { ...department, userDepartments: userDepartments };
  }
}
