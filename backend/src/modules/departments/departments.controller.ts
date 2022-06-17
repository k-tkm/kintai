import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Department } from 'src/entities/Department.entity';
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
  async getDepartments(): Promise<Department[]> {
    return await this.departmentsService.getDepartments();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getDepartmentDetail(@Param() params: ParamsDto): Promise<Department> {
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
    @Param() params: ParamsDto,
    @Body() departmentData: UpdateDepartmentDto,
  ): Promise<Department> {
    return await this.departmentsService.update(
      departmentData,
      Number(params.id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: ParamsDto) {
    await this.departmentsService.delete(Number(params.id));
  }
}
