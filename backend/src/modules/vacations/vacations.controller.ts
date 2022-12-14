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
import { RequestWithUserID } from 'src/utils/type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVacationDto } from './Dto/CreateVacation.Dto';
import { VacationParamsDto } from './Dto/vacationParams.dto';
import { getVacationsQueryDto } from './Dto/getVacationsQuery.Dto';
import { VacationsService } from './vacations.service';
import { UpdateDepartmentDto } from '../departments/Dto/UpdateDepartmentDto';

@Controller('vacations')
export class VacationsController {
  constructor(private vacationsService: VacationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getVacations(
    @Query() query: getVacationsQueryDto,
  ): Promise<Vacation[]> {
    return await this.vacationsService.getVacations(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getVacationDetail(
    @Param() params: VacationParamsDto,
  ): Promise<Vacation> {
    return await this.vacationsService.getVacationDetail(Number(params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: RequestWithUserID,
    @Body() body: CreateVacationDto,
  ): Promise<Vacation> {
    return await this.vacationsService.create(req.user.userID, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Req() req: RequestWithUserID,
    @Param() params: VacationParamsDto,
    @Body() body: UpdateDepartmentDto,
  ): Promise<Vacation> {
    return await this.vacationsService.update(
      Number(params.id),
      req.user.userID,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Req() req: RequestWithUserID,
    @Param() params: VacationParamsDto,
  ) {
    await this.vacationsService.delete(req.user.userID, Number(params.id));
  }
}
