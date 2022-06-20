import { ConflictException, HttpException, Injectable } from '@nestjs/common';
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

  private async findDepartmentByID(departmentID: number): Promise<Department> {
    return await this.departmentsRepository.findOne(departmentID);
  }

  private async findeUserDepartmentWithDeleted(
    userID: number,
    departmentID: number,
  ): Promise<UserDepartment> {
    return await this.userDepartmentsRepository.findOne({
      where: { user: userID, department: departmentID },
      withDeleted: true,
    });
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
    const existUsersDepartment = await this.findeUserDepartmentWithDeleted(
      user.id,
      department.id,
    );

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
    const newDepartment: Department = await this.departmentsRepository.save({
      name: departmentData.name,
    });

    const userDepartments: UserDepartment[] = [];
    if (departmentData.users.length) {
      for (const user of departmentData.users) {
        userDepartments.push(
          this.userDepartmentsRepository.create({
            department: newDepartment,
            user: user,
          }),
        );
      }
    }

    const savedUserDepartment = await this.userDepartmentsRepository.save(
      userDepartments,
    );
    return { ...newDepartment, userDepartments: savedUserDepartment };
  }

  async update(
    departmentData: UpdateDepartmentDto,
    departmentID: number,
  ): Promise<Department> {
    const existDepartment = await this.findDepartmentByID(departmentID);
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
