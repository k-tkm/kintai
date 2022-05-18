import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { User } from 'src/entities/User.entity';

define(User, () => {
  const user = new User();
  user.lastName = faker.name.lastName();
  user.firstName = faker.name.firstName();
  user.email = faker.internet.email();
  user.createdAt = faker.date.soon();
  user.updatedAt = faker.date.soon();
  return user;
});
