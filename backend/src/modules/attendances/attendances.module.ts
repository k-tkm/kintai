import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/Attendance.entity';
import { User } from 'src/entities/User.entity';
import { AttendancesController } from './attendances.controller';
import { AttendancesService } from './attendances.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, User])],
  controllers: [AttendancesController],
  providers: [AttendancesService],
})
export class AttendancesModule {}
