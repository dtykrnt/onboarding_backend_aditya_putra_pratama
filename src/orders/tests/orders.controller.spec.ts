import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/customers/entity';
import { Products } from 'src/products/entities';
import { Orders } from '../entities';
import { CreateOrderDto } from '../dto';
import { Repository } from 'typeorm';
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
        const data = await controller.create(createOrderDto);
        expect(data).toEqual(orderStub());
      });
    });
    describe('Update API', () => {
      it('should return when update api', async () => {
        const data = await controller.update(1, createOrderDto);
        expect(data).toEqual(orderStub());
      });
    });
  });
});
