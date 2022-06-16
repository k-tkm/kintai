import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/Department.entity';
import { User } from 'src/entities/User.entity';
import { UserDepartment } from 'src/entities/UserDepartment.entity';
import { Not, Repository } from 'typeorm';
import { CreateDepartmentDto } from './Dto/CreateDepartmentDto';
import { UpdateDepartmentDto } from './Dto/UpdateDepartmentDto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,

    @InjectRepository(UserDepartment)
    private userDepartmentsRepository: Repository<UserDepartment>,
  ) {}

  private async validateDuplicateName(
    departmentName: string,
    departmentID?: number,
  ) {
    const isExistDuplicateName = !!(await this.departmentsRepository.findOne({
      where: departmentID
        ? { id: Not(departmentID), name: departmentName }
        : { name: departmentName },
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
  }

  private async removeAllBelonging(existUsersDepartments: UserDepartment[]) {
    const existUsersDepartmentIds = existUsersDepartments.map((d) => d.id);
    await this.userDepartmentsRepository.softDelete(existUsersDepartmentIds);
  }

  private async removeBelonging({
    users,
    existUsersDepartments,
  }: {
    users: User[];
    existUsersDepartments: UserDepartment[];
  }) {
    const newUsersIDs = users.map((u) => u.id);
    const deletedUserDepartmentsIDs = existUsersDepartments
      .filter((d) => !newUsersIDs.includes(d?.user.id))
      .map((d) => d.id);
    if (deletedUserDepartmentsIDs.length) {
      await this.userDepartmentsRepository.softDelete(
        deletedUserDepartmentsIDs,
      );
    }
  }

  private async updateBelonging({
    user,
    department,
  }: {
    user: User;
    department: Department;
  }): Promise<UserDepartment> {
    const existUsersDepartment = await this.userDepartmentsRepository.findOne({
      where: { user: user.id, department: department.id },
      withDeleted: true,
    });

    if (existUsersDepartment) {
      const updatedBelonging = await this.userDepartmentsRepository.save({
        ...existUsersDepartment,
        department: department,
        user: user,
        updatedAt: new Date(),
        deletedAt: null,
      });
      return updatedBelonging;
    }

    const createdBelonging = await this.userDepartmentsRepository.save({
      department: department,
      user: user,
    });
    return createdBelonging;
  }

  async getDepartments(): Promise<Department[]> {
    return await this.departmentsRepository.find({
      relations: ['userDepartments', 'userDepartments.user'],
    });
  }

  async getDepartmentDetail(departmentID: number): Promise<Department> {
    return await this.departmentsRepository.findOne(departmentID, {
      relations: ['userDepartments', 'userDepartments.user'],
    });
  }

  async create(departmentData: CreateDepartmentDto): Promise<Department> {
    await this.validateDuplicateName(departmentData.name);

    const department: Department = await this.departmentsRepository.save({
      name: departmentData.name,
    });

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

  async update(
    departmentData: UpdateDepartmentDto,
    departmentID: number,
  ): Promise<Department> {
    await this.validateDuplicateName(departmentData.name, departmentID);

    const existDepartment = await this.departmentsRepository.findOne(
      departmentID,
    );
    const updatedDepartment: Department = await this.departmentsRepository.save(
      {
        ...existDepartment,
        name: departmentData.name,
        updatedAt: new Date(),
      },
    );

    const userDepartments: UserDepartment[] = [];
    if (departmentData.users) {
      const existUsersDepartments = await this.userDepartmentsRepository.find({
        where: { department: updatedDepartment.id },
        relations: ['user'],
      });
      if (departmentData.users.length === 0) {
        await this.removeAllBelonging(existUsersDepartments);
        return;
      }
      await this.removeBelonging({
        users: departmentData.users,
        existUsersDepartments: existUsersDepartments,
      });
      for (const user of departmentData.users) {
        userDepartments.push(
          await this.updateBelonging({ user, department: updatedDepartment }),
        );
      }
    }
    return { ...updatedDepartment, userDepartments: userDepartments };
  }

  async delete(departmentID: number) {
    await this.departmentsRepository.softDelete(departmentID);
  }
}
