import { Customers } from 'src/customers/entity';
import { Orders } from 'src/orders/entities';
import { Products } from 'src/products/entities';

export const orderStub = (): Orders => {
  return {
    product: {
      name: 'something',
      quantity: 1,
      id: 1,
      description: '',
      tag: '',
      orders: [],
      created_at: undefined,
      updated_at: undefined,
    },
    quantity: 1,
    created_at: undefined,
    updated_at: undefined,
    customer: {
      id: 1,
      name: '',
      email: '',
      created_at: undefined,
      updated_at: undefined,
      orders: [],
    },
    customer_id: 1,
    product_id: 1,
    id: 1,
  };
};

export const productStub = (): Products => {
  return {
    created_at: undefined,
    description: 'this product',
    id: 1,
    name: 'product',
    orders: undefined,
    quantity: 1,
    tag: 'product',
    updated_at: undefined,
  };
};

export const custStub = (): Customers => {
  return {
    created_at: undefined,
    id: 1,
    name: 'customer',
    orders: undefined,
    email: 'customer@gmail.com',
    updated_at: undefined,
  };
};
