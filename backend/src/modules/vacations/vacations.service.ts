import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacation } from 'src/entities/Vacation.entity';
import { Repository } from 'typeorm';
import { CreateVacationDto } from './Dto/CreateVacation.Dto';
import { getVacationsQueryDto } from './Dto/getVacationsQuery.Dto';

@Injectable()
export class VacationsService {
  constructor(
    @InjectRepository(Vacation)
    private vacationsRepository: Repository<Vacation>,
  ) {}

  async getVacations(query: getVacationsQueryDto): Promise<Vacation[]> {
    const { startDate, endDate, user_id } = query;
    const vacations = await this.vacationsRepository
      .createQueryBuilder('vacations')
      .leftJoinAndSelect('user', 'u')
      .where('vacations.date between :startDate and :endDate', {
        startDate: startDate,
        endDate: endDate,
      })
      .andWhere('u.id = :id', { id: user_id })
      .getMany();

    return vacations;
  }

  async getVacationDetail(vacationID: number): Promise<Vacation> {
    return this.vacationsRepository.findOne(vacationID, {
      relations: ['user'],
    });
  }

  create(body: CreateVacationDto): Promise<Vacation> {
    const { date, type, description } = body;

    return this.vacationsRepository.save({ date, type, description });
  }

  async update(
    vacationID: number,
    userID: number,
    newDate: CreateVacationDto,
  ): Promise<Vacation> {
    const existVacation = await this.vacationsRepository.findOne(vacationID);
    if (existVacation.user.id !== userID) {
      throw new HttpException(
        {
          statusCode: 403,
          error: 'この休暇情報を編集する権限がありません。',
        },
        403,
      );
    }
    return await this.vacationsRepository.save({
      ...existVacation,
      ...newDate,
      updatedAt: new Date(),
    });
  }
}
