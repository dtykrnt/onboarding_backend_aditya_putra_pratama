import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from '../dto';
import { DeleteOrderDto } from '../dto/delete-order.dto';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { orderStub } from './stubs/order.stub';

describe('OrdersController', () => {
  let controller: OrdersController;

  const mockOrderService = {
    create: jest.fn((dto: CreateOrderDto) => {
      return {
        ...orderStub(),
        customer_id: dto.customer_id,
        product_id: dto.product_id,
      };
    }),
    update: jest.fn((dto: CreateOrderDto) => {
      return {
        ...orderStub(),
      };
    }),
    remove: jest.fn((dto: DeleteOrderDto) => {
      return {};
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(mockOrderService)
      .compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CRUD Controller:', () => {
    const createOrderDto: CreateOrderDto = {
      customer_id: 1,
      order_quantity: 1,
      product_id: 1,
    };
    describe('Create API', () => {
      it('should success when create order api', async () => {
        const res = await controller.create(createOrderDto);
        expect(res).toEqual(orderStub());
      });
    });
    describe('Update API', () => {
      it('should return data when update api', async () => {
        const res = await controller.update(1, createOrderDto);
        expect(res).toEqual(orderStub());
      });
    });

    describe('Delete API', () => {
      it('should return {} when update api', async () => {
        const res = await controller.remove(1);
        expect(res).toEqual({});
      });
    });
  });
});
