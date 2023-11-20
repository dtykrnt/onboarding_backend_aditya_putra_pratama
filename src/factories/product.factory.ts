import type { Faker } from '@faker-js/faker';
import { Products } from 'src/products/entities';
import { define } from 'typeorm-seeding';

define(Products, (faker: Faker) => {
  const customer = new Products();
  const productName = faker.commerce.product();
  customer.name = productName;
  customer.description = productName;
  customer.tag = productName;
  customer.quantity = 100;
  return customer;
});
