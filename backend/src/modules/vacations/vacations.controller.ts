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
import { Vacation } from 'src/entities/Vacation.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVacationDto } from './Dto/CreateVacation.Dto';
import { VacationParamsDto } from './Dto/vacationParams.dto';
import { getVacationsQueryDto } from './Dto/getVacationsQuery.Dto';
import { VacationsService } from './vacations.service';

type RequestWithUserID = Request & {
  user: { userID: number };
};

@Controller('vacations')
export class VacationsController {
  constructor(private vacationsService: VacationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getVacations(@Query() query: getVacationsQueryDto): Promise<Vacation[]> {
    return this.vacationsService.getVacations(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getVacationDetail(@Param() params: VacationParamsDto): Promise<Vacation> {
    return this.vacationsService.getVacationDetail(Number(params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: RequestWithUserID,
    @Body() body: CreateVacationDto,
  ): Promise<Vacation> {
    return this.vacationsService.create(req.user.userID, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Req() req: RequestWithUserID,
    @Param() params: VacationParamsDto,
    @Body() body: CreateVacationDto,
  ): Promise<Vacation> {
    return this.vacationsService.update(
      Number(params.id),
      req.user.userID,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Req() req: RequestWithUserID, @Param() params: VacationParamsDto) {
    return this.vacationsService.delete(req.user.userID, Number(params.id));
  }
}
