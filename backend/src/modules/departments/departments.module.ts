import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entities/Department.entity';
import { UserDepartment } from 'src/entities/UserDepartment.entity';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  providers: [DepartmentsService],
  controllers: [DepartmentsController],
  imports: [TypeOrmModule.forFeature([Department, UserDepartment])],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
