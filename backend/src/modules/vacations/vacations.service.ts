import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacation } from 'src/entities/Vacation.entity';
import { Repository } from 'typeorm';
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
}
