import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Department } from 'src/entities/Department.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DepartmentsService } from './departments.service';
import { FindOneParams } from './Dto/FindOneParams';

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
}
