import type { Faker } from '@faker-js/faker';
import { Customers } from 'src/customers/entity/customers.entity';
import { define } from 'typeorm-seeding';

define(Customers, (faker: Faker) => {
  const customer = new Customers();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  customer.name = `${firstName} ${lastName}`;
  customer.email = `${firstName}${lastName}@gmail.com`;
  return customer;
});
