import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Vacation, VacationType } from 'src/entities/Vacation.entity';

const now = new Date();

const typeArray = [
  VacationType.PAID,
  VacationType.CHILDCARE,
  VacationType.MATERNITY,
  VacationType.SICK,
];

const randomValue = typeArray[Math.floor(Math.random() * typeArray.length)];

define(Vacation, () => {
  const vacation = new Vacation();
  vacation.date = faker.date.future();
  vacation.description = faker.lorem.lines();
  vacation.type = randomValue;
  vacation.createdAt = now;
  vacation.updatedAt = now;
  return vacation;
});
