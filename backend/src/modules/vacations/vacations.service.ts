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

  private async findVacationWithUser(vacationID: number): Promise<Vacation> {
    return await this.vacationsRepository.findOne(vacationID, {
      relations: ['user'],
    });
  }

  async getVacations(query: getVacationsQueryDto): Promise<Vacation[]> {
    const { startDate, endDate, user_id } = query;
    const vacations = await this.vacationsRepository
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

  async getVacationDetail(vacationID: number): Promise<Vacation> {
    return await this.findVacationWithUser(vacationID);
  }

  async create(userID: number, newData: CreateVacationDto): Promise<Vacation> {
    const { date, type, description } = newData;
    const requestUser = await this.usersRepository.findOne(userID);

    return await this.vacationsRepository.save({
      date,
      type,
      description,
      user: requestUser,
    });
  }

  async update(
    vacationID: number,
    userID: number,
    newData: UpdateDepartmentDto,
  ): Promise<Vacation> {
    const existVacation = await this.findVacationWithUser(vacationID);
    await this.checkPermission({ existVacation, userID });
    return await this.vacationsRepository.save({
      ...existVacation,
      ...newData,
      updatedAt: new Date(),
    });
  }

  async delete(vacationID: number, userID: number) {
    const existVacation = await this.findVacationWithUser(vacationID);
    await this.checkPermission({ existVacation, userID });
    await this.vacationsRepository.softDelete(existVacation);
  }
}
