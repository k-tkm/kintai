import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/Department.entity';
import { UserDepartment } from 'src/entities/UserDepartment.entity';
import { Not, Repository } from 'typeorm';
import { UpdateDepartmentDto } from './Dto/UpdateDepartmentDto';

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

  async updateDepartment(
    departmentData: UpdateDepartmentDto,
    departmentID?: number,
  ): Promise<Department> {
    const isExistDuplicateName = !!(await this.departmentsRepository.findOne({
      where: departmentID
        ? { id: Not(departmentID), name: departmentData.name }
        : {
            name: departmentData.name,
          },
    }));

    if (isExistDuplicateName) {
      throw new HttpException(
        {
          statusCode: 409,
          error: '既に作成されている部署名です。',
        },
        409,
      );
    }

    const existDepartment = await this.departmentsRepository.findOne(
      departmentID,
    );
    const department: Department = departmentID
      ? await this.departmentsRepository.save({
          ...existDepartment,
          name: departmentData.name,
          updatedAt: new Date(),
        })
      : await this.departmentsRepository.save({ name: departmentData.name });

    const userDepartments: UserDepartment[] = [];
    if (departmentData.users.length) {
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
