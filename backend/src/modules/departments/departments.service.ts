import { defaultQuery } from './../../utils/defualt';
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

  private async findDepartmentByID(
    departmentID: number,
    companyId: number,
  ): Promise<Department> {
    return await (await defaultQuery(companyId))
      .getRepository(Department)
      .findOne(departmentID);
  }

  private async foundUserDepartmentWithDeleted(
    userID: number,
    departmentID: number,
    companyID: number,
  ): Promise<UserDepartment> {
    return await (await defaultQuery(companyID))
      .getRepository(UserDepartment)
      .findOne({
        where: { user: userID, department: departmentID },
        withDeleted: true,
      });
  }

  private async removeAllBelonging(
    existUsersDepartments: UserDepartment[],
    companyId: number,
  ) {
    const existUsersDepartmentIds = existUsersDepartments.map((d) => d.id);
    await (await defaultQuery(companyId))
      .getRepository(UserDepartment)
      .softDelete(existUsersDepartmentIds);
  }

  private async removeBelonging({
    usersExcludeRemove,
    existUsersDepartments,
    companyId,
  }: {
    usersExcludeRemove: User[];
    existUsersDepartments: UserDepartment[];
    companyId: number;
  }) {
    if (usersExcludeRemove.length === 0) {
      await this.removeAllBelonging(existUsersDepartments, companyId);
      return;
    }
    const newUsersIDs = usersExcludeRemove.map((u) => u.id);
    const deletedUserDepartmentsIDs = existUsersDepartments
      .filter((d) => !newUsersIDs.includes(d?.user.id))
      .map((d) => d.id);
    if (deletedUserDepartmentsIDs.length) {
      await (await defaultQuery(companyId))
        .getRepository(UserDepartment)
        .softDelete(deletedUserDepartmentsIDs);
    }
  }

  private async generateBelonging({
    user,
    department,
    companyId,
  }: {
    user: User;
    department: Department;
    companyId: number;
  }): Promise<UserDepartment> {
    const existUsersDepartment = await this.foundUserDepartmentWithDeleted(
      user.id,
      department.id,
      companyId,
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
    companyId: number,
  ): Promise<UserDepartment[]> {
    const allBelonging = await Promise.all(
      newUsersBelonging.map(
        async (u) =>
          await this.generateBelonging({
            user: u,
            department: updatedDepartment,
            companyId,
          }),
      ),
    );
    const updatedAllBelonging = await (await defaultQuery(companyId))
      .getRepository(UserDepartment)
      .save(allBelonging);
    return updatedAllBelonging;
  }

  private async updateUserDepartments(
    newUsersBelonging: User[],
    updatedDepartment: Department,
    companyId: number,
  ): Promise<UserDepartment[]> {
    const existUsersDepartments = await (await defaultQuery(companyId))
      .getRepository(UserDepartment)
      .find({
        where: { department: updatedDepartment.id },
        relations: ['user'],
      });
    if (newUsersBelonging) {
      await this.removeBelonging({
        usersExcludeRemove: newUsersBelonging,
        existUsersDepartments: existUsersDepartments,
        companyId,
      });

      const updatedUserDepartments = await this.updateAllBelonging(
        newUsersBelonging,
        updatedDepartment,
        companyId,
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

  async getDepartments(reqUser: User): Promise<Department[]> {
    return await (await defaultQuery(reqUser.company.id))
      .getRepository(Department)
      .find({
        relations: ['userDepartments', 'userDepartments.user'],
      });
  }

  async getDepartmentDetail(
    departmentID: number,
    reqUser: User,
  ): Promise<Department> {
    return await (await defaultQuery(reqUser.company.id))
      .getRepository(Department)
      .findOne(departmentID, {
        relations: ['userDepartments', 'userDepartments.user'],
      });
  }

  async create(
    departmentData: CreateDepartmentDto,
    reqUser: User,
  ): Promise<Department> {
    const newDepartment: Department = await (
      await defaultQuery(reqUser.company.id)
    )
      .getRepository(Department)
      .save({
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
    const savedUserDepartment = await (await defaultQuery(reqUser.company.id))
      .getRepository(UserDepartment)
      .save(userDepartments);

    return { ...newDepartment, userDepartments: savedUserDepartment };
  }

  async update(
    departmentData: UpdateDepartmentDto,
    departmentID: number,
    reqUser: User,
  ): Promise<Department> {
    const existDepartment = await this.findDepartmentByID(
      departmentID,
      reqUser.company.id,
    );
    const updatedDepartment: Department = await (
      await defaultQuery(reqUser.company.id)
    )
      .getRepository(Department)
      .save({
        ...existDepartment,
        name: departmentData.name,
        updatedAt: new Date(),
      });
    const updatedUserDepartments = await this.updateUserDepartments(
      departmentData.users,
      updatedDepartment,
      reqUser.company.id,
    );
    return { ...updatedDepartment, userDepartments: updatedUserDepartments };
  }

  async delete(departmentID: number) {
    await this.departmentsRepository.softDelete(departmentID);
  }
}
