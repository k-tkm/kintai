import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/Attendance.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './Dto/CreateAttendance.Dto';
import { getAttendancesQueryDto } from './Dto/GetAttendancesQuery.Dto';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private attendancesRepository: Repository<Attendance>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  async create(
    userID: number,
    newData: CreateAttendanceDto,
  ): Promise<Attendance> {
    const requestUser = await this.usersRepository.findOne(userID);
    return this.attendancesRepository.save({ ...newData, user: requestUser });
  }
}
