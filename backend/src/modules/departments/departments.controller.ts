import { RequestWithUserID } from 'src/utils/type';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/Department.entity';
import { Not, Repository } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParamsDto } from '../Dto/Params.dto';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './Dto/CreateDepartmentDto';
import { UpdateDepartmentDto } from './Dto/UpdateDepartmentDto';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDepartments(@Req() req: RequestWithUserID): Promise<Department[]> {
    return await this.departmentsService.getDepartments(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getDepartmentDetail(
    @Param() params: ParamsDto,
    @Req() req: RequestWithUserID,
  ): Promise<Department> {
    return await this.departmentsService.getDepartmentDetail(
      Number(params.id),
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() departmentData: CreateDepartmentDto,
    @Req() req: RequestWithUserID,
  ): Promise<Department> {
    await this.departmentsService.validateDuplicateName(departmentData.name);
    return await this.departmentsService.create(departmentData, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() params: ParamsDto,
    @Body() departmentData: UpdateDepartmentDto,
    @Req() req: RequestWithUserID,
  ): Promise<Department> {
    await this.departmentsService.validateDuplicateName(
      departmentData.name,
      Number(params.id),
    );
    return await this.departmentsService.update(
      departmentData,
      Number(params.id),
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: ParamsDto) {
    await this.departmentsService.delete(Number(params.id));
  }
}
