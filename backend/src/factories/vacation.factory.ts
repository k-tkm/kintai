import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Vacation } from 'src/entities/Vacation.entity';

const now = new Date();

define(Vacation, () => {
  const vacation = new Vacation();
  vacation.date = faker.date.future();
  vacation.description = faker.lorem.lines();
  vacation.createdAt = now;
  vacation.updatedAt = now;
  return vacation;
});
