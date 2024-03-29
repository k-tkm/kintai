import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Vacation } from 'src/entities/Vacation.entity';
import { VacationsController } from './vacations.controller';
import { VacationsService } from './vacations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vacation, User])],
  controllers: [VacationsController],
  providers: [VacationsService],
})
export class VacationsModule {}
