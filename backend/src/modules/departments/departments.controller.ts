import { Controller, Get, UseGuards } from '@nestjs/common';
import { Department } from 'src/entities/Department.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  getDepartments(): Promise<Department[]> {
    return this.departmentsService.getDepartments();
  }
}
