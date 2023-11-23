import type { Faker } from '@faker-js/faker';
import { Customers } from 'src/customers/entity/customers.entity';
import { define } from 'typeorm-seeding';

define(Customers, (faker: Faker) => {
  const customer = new Customers();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = `${firstName + lastName}`.toLowerCase();
  customer.name = `${firstName} ${lastName}`;
  customer.email = `${email}@gmail.com`;
  customer.phone_number = '123';
  return customer;
});
