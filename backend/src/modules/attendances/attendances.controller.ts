import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Attendance } from 'src/entities/Attendance.entity';
import { RequestWithUserID } from 'src/utils/type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './Dto/CreateAttendance.Dto';
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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: RequestWithUserID,
    @Body() newData: CreateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendancesService.create(req.user.userID, newData);
  }
}
