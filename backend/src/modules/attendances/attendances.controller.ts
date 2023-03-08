import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Attendance } from 'src/entities/Attendance.entity';
import { RequestWithUserID } from 'src/utils/type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './Dto/CreateAttendance.Dto';
import { FindOneParams } from './Dto/FindeOneParams';
import { getAttendancesQueryDto } from './Dto/GetAttendancesQuery.Dto';

@Controller('attendances')
export class AttendancesController {
  constructor(private attendancesService: AttendancesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAttendances(
    @Req() req: RequestWithUserID,
    @Query() query: getAttendancesQueryDto,
  ): Promise<Attendance[]> {
    return this.attendancesService.getAttendances(query, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: RequestWithUserID,
    @Body() newData: CreateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendancesService.create(req.user, newData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Req() req: RequestWithUserID,
    @Param() params: FindOneParams,
    @Body() body: CreateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendancesService.update(params.id, req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Req() req: RequestWithUserID, @Param() params: FindOneParams) {
    return this.attendancesService.delete(req.user, params.id);
  }
}
