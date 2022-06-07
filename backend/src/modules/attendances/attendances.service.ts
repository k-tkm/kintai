import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/Attendance.entity';
import { Repository } from 'typeorm';
import { getAttendancesQueryDto } from './Dto/GetAttendancesQuery.Dto';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private attendancesRepository: Repository<Attendance>,
  ) {}

  async getAttendances(query: getAttendancesQueryDto): Promise<Attendance[]> {
    const attendances = await this.attendancesRepository
      .createQueryBuilder('attendances')
      .leftJoinAndSelect('attendances.user', 'u')
      .where('attendances.date between :startDate and :endDate', {
        startDate: query.startDate,
        endDate: query.endDate,
      })
      .andWhere('u.id = :id', { id: query.user_id })
      .getMany();
    return attendances;
  }
}
