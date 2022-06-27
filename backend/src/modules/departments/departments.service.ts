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
    usersExcludeRemove,
    existUsersDepartments,
  }: {
    usersExcludeRemove: User[];
    existUsersDepartments: UserDepartment[];
  }) {
    if (usersExcludeRemove.length === 0) {
      await this.removeAllBelonging(existUsersDepartments);
      return;
    }
    const newUsersIDs = usersExcludeRemove.map((u) => u.id);
    const deletedUserDepartmentsIDs = existUsersDepartments
      .filter((d) => !newUsersIDs.includes(d?.user.id))
      .map((d) => d.id);
    if (deletedUserDepartmentsIDs.length) {
      await this.userDepartmentsRepository.softDelete(
        deletedUserDepartmentsIDs,
      );
    }
  }

  private async generateBelonging({
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
      const updatedBelonging = this.userDepartmentsRepository.create({
        ...existUsersDepartment,
        department: department,
        user: user,
        updatedAt: new Date(),
        deletedAt: null,
      });
      return updatedBelonging;
    }

    const createdBelonging = this.userDepartmentsRepository.create({
      department: department,
      user: user,
    });
    return createdBelonging;
  }

  private async updateAllBelonging(
    newUsersBelonging: User[],
    updatedDepartment: Department,
  ): Promise<UserDepartment[]> {
    const allBelonging = await Promise.all(
      newUsersBelonging.map(
        async (u) =>
          await this.generateBelonging({
            user: u,
            department: updatedDepartment,
          }),
      ),
    );
    const updatedAllBelonging = await this.userDepartmentsRepository.save(
      allBelonging,
    );
    return updatedAllBelonging;
  }

  private async updateUserDepartments(
    newUsersBelonging: User[],
    updatedDepartment: Department,
  ): Promise<UserDepartment[]> {
    const existUsersDepartments = await this.userDepartmentsRepository.find({
      where: { department: updatedDepartment.id },
      relations: ['user'],
    });
    if (newUsersBelonging) {
      await this.removeBelonging({
        usersExcludeRemove: newUsersBelonging,
        existUsersDepartments: existUsersDepartments,
      });

      const updatedUserDepartments = await this.updateAllBelonging(
        newUsersBelonging,
        updatedDepartment,
      );
      return updatedUserDepartments;
    }
    return existUsersDepartments;
  }

  private async findDepartmentByName(
    departmentName: string,
    departmentID?: number,
  ): Promise<Department> {
    const departmentWithDuplicateName =
      await this.departmentsRepository.findOne({
        where: departmentID
          ? { id: Not(departmentID), name: departmentName }
          : { name: departmentName },
      });
    return departmentWithDuplicateName;
  }

  async validateDuplicateName(departmentName: string, departmentID?: number) {
    const departmentWithDuplicateName = await this.findDepartmentByName(
      departmentName,
      departmentID,
    );
    if (departmentWithDuplicateName) {
      throw new ConflictException('この部署名はすでに使用されています。');
    }
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

    let userDepartments: UserDepartment[] = [];
    if (departmentData.users.length) {
      userDepartments = departmentData.users.map((u) => {
        return this.userDepartmentsRepository.create({
          department: newDepartment,
          user: u,
        });
      });
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
    const updatedUserDepartments = await this.updateUserDepartments(
      departmentData.users,
      updatedDepartment,
    );
    return { ...updatedDepartment, userDepartments: updatedUserDepartments };
  }

  async delete(departmentID: number) {
    await this.departmentsRepository.softDelete(departmentID);
  }
}
