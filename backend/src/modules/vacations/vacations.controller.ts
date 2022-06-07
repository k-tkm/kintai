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
import { FindOneParams } from './Dto/FindeOneParams';
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
  getVacationDetail(@Param() params: FindOneParams): Promise<Vacation> {
    return this.vacationsService.getVacationDetail(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateVacationDto): Promise<Vacation> {
    return this.vacationsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Req() req: RequestWithUserID,
    @Param() params: FindOneParams,
    @Body() body: CreateVacationDto,
  ): Promise<Vacation> {
    return this.vacationsService.update(params.id, req.user.userID, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Req() req: RequestWithUserID, @Param() params: FindOneParams) {
    return this.vacationsService.delete(req.user.userID, params.id);
  }
}
