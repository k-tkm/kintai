import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Department } from 'src/entities/Department.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './Dto/CreateDepartmentDto';
import { DepartmentParamsDto } from './Dto/DepartmentParams.dto';
import { UpdateDepartmentDto } from './Dto/UpdateDepartmentDto';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getDepartments(): Promise<Department[]> {
    return await this.departmentsService.getDepartments();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getDepartmentDetail(
    @Param() params: DepartmentParamsDto,
  ): Promise<Department> {
    return await this.departmentsService.getDepartmentDetail(Number(params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() departmentData: CreateDepartmentDto,
  ): Promise<Department> {
    return await this.departmentsService.create(departmentData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() params: DepartmentParamsDto,
    @Body() departmentData: UpdateDepartmentDto,
  ): Promise<Department> {
    return await this.departmentsService.update(
      departmentData,
      Number(params.id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: DepartmentParamsDto) {
    await this.departmentsService.delete(Number(params.id));
  }
}
