import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Department } from 'src/entities/Department.entity';

const now = new Date();
define(Department, () => {
  const department = new Department();
  department.name = faker.company.companyName();
  department.createdAt = now;
  department.updatedAt = now;
  return department;
});
