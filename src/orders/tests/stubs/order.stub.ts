import { Orders } from 'src/orders/entities';

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
