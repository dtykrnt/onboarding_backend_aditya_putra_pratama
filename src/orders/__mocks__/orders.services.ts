import { orderStub } from '../tests/stubs/order.stub';

export const mockOrderService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(orderStub()),
});
