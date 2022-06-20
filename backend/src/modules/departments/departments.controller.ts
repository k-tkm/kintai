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
  constructor(
    private departmentsService: DepartmentsService,
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  private async checkExistDuplicateName(
    departmentName: string,
    departmentID?: number,
  ): Promise<boolean> {
    const isExistDuplicateName = !!(await this.departmentsRepository.findOne({
      where: departmentID
        ? { id: Not(departmentID), name: departmentName }
        : { name: departmentName },
    }));
    return isExistDuplicateName;
  }

  private async validateDuplicateName(
    departmentName: string,
    departmentID?: number,
  ) {
    const isExistDuplicateName = await this.checkExistDuplicateName(
      departmentName,
      departmentID,
    );
    if (isExistDuplicateName) {
      throw new ConflictException('この部署名はすでに使用されています。');
    }
  }

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
    await this.validateDuplicateName(departmentData.name);
    return await this.departmentsService.create(departmentData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() params: ParamsDto,
    @Body() departmentData: UpdateDepartmentDto,
  ): Promise<Department> {
    await this.validateDuplicateName(departmentData.name, Number(params.id));
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
