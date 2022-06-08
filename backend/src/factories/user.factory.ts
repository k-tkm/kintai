import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { User } from 'src/entities/User.entity';

const now = new Date();

define(User, () => {
  const user = new User();
  user.lastName = faker.name.lastName();
  user.firstName = faker.name.firstName();
  user.email = faker.internet.email();
  user.createdAt = now;
  user.updatedAt = now;
  return user;
});
