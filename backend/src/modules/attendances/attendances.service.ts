import { defaultQuery } from './../../utils/defualt';
import { HttpException, Injectable } from '@nestjs/common';
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

  async getAttendances(
    query: getAttendancesQueryDto,
    reqUser: User,
  ): Promise<Attendance[]> {
    const attendances = await (
      await defaultQuery(reqUser.company.id)
    )
      .getRepository(Attendance)
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
    reqUser: User,
    newData: CreateAttendanceDto,
  ): Promise<Attendance> {
    return await (await defaultQuery(reqUser.company.id))
      .getRepository(Attendance)
      .save({
        ...newData,
        user: reqUser,
        company: reqUser.company,
      });
  }

  async update(
    attendanceID: number,
    reqUser: User,
    newDate: CreateAttendanceDto,
  ): Promise<Attendance> {
    const existAttendance = await (await defaultQuery(reqUser.company.id))
      .getRepository(Attendance)
      .findOne(attendanceID, {
        relations: ['user'],
      });
    if (existAttendance.user.id !== reqUser.id) {
      throw new HttpException(
        {
          statusCode: 403,
          error: 'この勤怠を編集する権限がありません。',
        },
        403,
      );
    }
    return await (await defaultQuery(reqUser.company.id))
      .getRepository(Attendance)
      .save({
        ...existAttendance,
        ...newDate,
        company: reqUser.company,
        updatedAt: new Date(),
      });
  }

  async delete(reqUser: User, attendanceID: number) {
    const existAttendance = await (await defaultQuery(reqUser.company.id))
      .getRepository(Attendance)
      .findOne(attendanceID, {
        relations: ['user'],
      });
    if (existAttendance.user.id !== reqUser.id) {
      throw new HttpException(
        {
          statusCode: 403,
          error: 'この勤怠情報を削除する権限がありません。',
        },
        403,
      );
    }

    await (await defaultQuery(reqUser.company.id))
      .getRepository(Attendance)
      .softDelete(existAttendance);
  }
}
