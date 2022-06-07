import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Attendance } from 'src/entities/Attendance.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AttendancesService } from './attendances.service';
import { getAttendancesQueryDto } from './Dto/GetAttendancesQuery.Dto';

@Controller('attendances')
export class AttendancesController {
  constructor(private attendancesService: AttendancesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAttendances(
    @Query() query: getAttendancesQueryDto,
  ): Promise<Attendance[]> {
    return this.attendancesService.getAttendances(query);
  }
}
