import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Vacation } from 'src/entities/Vacation.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getVacationsQueryDto } from './Dto/getVacationsQuery.Dto';
import { VacationsService } from './vacations.service';

@Controller('vacations')
export class VacationsController {
  constructor(private vacationsService: VacationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Query() query: getVacationsQueryDto): Promise<Vacation[]> {
    return this.vacationsService.get(query);
  }
}
