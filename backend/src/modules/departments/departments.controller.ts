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
  getDepartments(): Promise<Department[]> {
    return this.departmentsService.getDepartments();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getDepartmentDetail(
    @Param() params: DepartmentParamsDto,
  ): Promise<Department> {
    return this.departmentsService.getDepartmentDetail(Number(params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() departmentData: CreateDepartmentDto): Promise<Department> {
    return this.departmentsService.create(departmentData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param() params: DepartmentParamsDto,
    @Body() departmentData: UpdateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.update(departmentData, Number(params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() params: DepartmentParamsDto) {
    this.departmentsService.delete(Number(params.id));
  }
}
