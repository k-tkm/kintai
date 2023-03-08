import { defaultQuery } from './../../utils/defualt';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Vacation } from 'src/entities/Vacation.entity';
import { Repository } from 'typeorm';
import { UpdateDepartmentDto } from '../departments/Dto/UpdateDepartmentDto';
import { CreateVacationDto } from './Dto/CreateVacation.Dto';
import { getVacationsQueryDto } from './Dto/getVacationsQuery.Dto';

@Injectable()
export class VacationsService {
  constructor(
    @InjectRepository(Vacation)
    private vacationsRepository: Repository<Vacation>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async checkPermission({
    existVacation,
    userID,
  }: {
    existVacation: Vacation;
    userID: number;
  }) {
    if (existVacation.user.id !== userID) {
      throw new HttpException(
        {
          statusCode: 403,
          error: 'この休暇情報を編集する権限がありません。',
        },
        403,
      );
    }
  }

  private async findVacationWithUser(
    vacationID: number,
    companyId: number,
  ): Promise<Vacation> {
    return await (await defaultQuery(companyId))
      .getRepository(Vacation)
      .findOne(vacationID, {
        relations: ['user'],
      });
  }

  async getVacations(
    query: getVacationsQueryDto,
    reqUser: User,
  ): Promise<Vacation[]> {
    const { startDate, endDate, user_id } = query;
    const vacations = await (
      await defaultQuery(reqUser.company.id)
    )
      .getRepository(Vacation)
      .createQueryBuilder('vacations')
      .leftJoinAndSelect('vacations.user', 'u')
      .where('vacations.date between :startDate and :endDate', {
        startDate: startDate,
        endDate: endDate,
      })
      .andWhere('u.id = :id', { id: user_id })
      .getMany();

    return vacations;
  }

  async getVacationDetail(
    vacationID: number,
    reqUser: User,
  ): Promise<Vacation> {
    return await this.findVacationWithUser(vacationID, reqUser.company.id);
  }

  async create(reqUser: User, newData: CreateVacationDto): Promise<Vacation> {
    const { date, type, description } = newData;

    return await (await defaultQuery(reqUser.company.id))
      .getRepository(Vacation)
      .save({
        date,
        type,
        description,
        user: reqUser,
      });
  }

  async update(
    vacationID: number,
    reqUser: User,
    newData: UpdateDepartmentDto,
  ): Promise<Vacation> {
    const existVacation = await this.findVacationWithUser(
      vacationID,
      reqUser.company.id,
    );
    await this.checkPermission({ existVacation, userID: reqUser.id });
    return await this.vacationsRepository.save({
      ...existVacation,
      ...newData,
      updatedAt: new Date(),
    });
  }

  async delete(vacationID: number, reqUser: User) {
    const existVacation = await this.findVacationWithUser(
      vacationID,
      reqUser.company.id,
    );
    await this.checkPermission({ existVacation, userID: reqUser.id });
    await (await defaultQuery(reqUser.company.id))
      .getRepository(Vacation)
      .softDelete(existVacation);
  }
}
