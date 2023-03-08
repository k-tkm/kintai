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
    @Req() req: RequestWithUserID,
  ): Promise<Vacation[]> {
    return await this.vacationsService.getVacations(query, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getVacationDetail(
    @Param() params: VacationParamsDto,
    @Req() req: RequestWithUserID,
  ): Promise<Vacation> {
    return await this.vacationsService.getVacationDetail(
      Number(params.id),
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: RequestWithUserID,
    @Body() body: CreateVacationDto,
  ): Promise<Vacation> {
    return await this.vacationsService.create(req.user, body);
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
      req.user,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Req() req: RequestWithUserID,
    @Param() params: VacationParamsDto,
  ) {
    await this.vacationsService.delete(Number(params.id), req.user);
  }
}
