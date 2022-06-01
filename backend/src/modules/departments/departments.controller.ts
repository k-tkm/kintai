import {
  Body,
  Controller,
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
import { FindOneParams } from './Dto/FindOneParams';
import { UpdateDepartmentDto } from './Dto/UpdateDepartmentDto';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  getDepartments(): Promise<Department[]> {
    return this.departmentsService.getDepartments();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getDepartmentDetail(@Param() params: FindOneParams): Promise<Department> {
    return this.departmentsService.getDepartmentDetail(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createDepartment(
    @Body() departmentData: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.updateDepartment(departmentData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateDepartment(
    @Param() params: FindOneParams,
    @Body() departmentData: UpdateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.updateDepartment(departmentData, params.id);
  }
}
