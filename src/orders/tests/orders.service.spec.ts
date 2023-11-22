import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Orders } from '../entities';
import { DeleteResult, Repository } from 'typeorm';
import { Products } from 'src/products/entities';
import { Customers } from 'src/customers/entity';
import { CreateOrderDto, UpdateOrderDto } from '../dto';
import { custStub, orderStub, productStub } from './stubs/order.stub';
import { IResponseJson } from 'src/interface';
import { ICustomers } from 'src/customers/customers.interface';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepository: Repository<Orders>;
  let productRepository: Repository<Products>;
  let customerRepository: Repository<Customers>;

  let orderRepositoryToken: string | Function = getRepositoryToken(Orders);
  let productRepositoryToken: string | Function = getRepositoryToken(Products);
  let customerRepositoryToken: string | Function =
    getRepositoryToken(Customers);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: orderRepositoryToken,
          useClass: Repository,
        },
        {
          provide: productRepositoryToken,
          useClass: Repository,
        },
        {
          provide: customerRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<Repository<Orders>>(orderRepositoryToken);
    productRepository = module.get<Repository<Products>>(
      productRepositoryToken,
    );
    customerRepository = module.get<Repository<Customers>>(
      customerRepositoryToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('OrderServices Flow', () => {
    describe('Add Order', () => {
      const createOrderDto: CreateOrderDto = {
        customer_id: 1,
        order_quantity: 1,
        product_id: 1,
      };

      it('should return success on add order', async () => {
        jest
          .spyOn(orderRepository, 'findOneBy')
          .mockResolvedValueOnce(orderStub());

        jest
          .spyOn(productRepository, 'findOneBy')
          .mockResolvedValueOnce(productStub());

        jest
          .spyOn(customerRepository, 'findOneBy')
          .mockResolvedValueOnce(custStub());

        const orderSum = {
          name: 'odol',
          description: 'ini pasta gigi',
          tag: 'pasta gigi',
          quantity: 100,
          id: 61,
          created_at: undefined,
          updated_at: undefined,
        } as unknown as Orders;

        jest.spyOn(productRepository, 'save').mockResolvedValueOnce(undefined);
        jest.spyOn(orderRepository, 'save').mockResolvedValueOnce(orderSum);

        const order = await service.create(createOrderDto);
        expect(order.data).toEqual(orderSum);
      });

      it('should return failed when product is not exist', async () => {
        jest
          .spyOn(productRepository, 'findOneBy')
          .mockResolvedValueOnce(undefined);

        jest
          .spyOn(customerRepository, 'findOneBy')
          .mockResolvedValueOnce(custStub());

        try {
          await service.create(createOrderDto);
        } catch (error) {
          expect(error.status).toBe(404);
          expect(error.message).toBe('Not Found');
        }
      });

      it('should return failed when product is not exist', async () => {
        jest
          .spyOn(customerRepository, 'findOneBy')
          .mockResolvedValueOnce(undefined);

        jest
          .spyOn(productRepository, 'findOneBy')
          .mockResolvedValueOnce(productStub());

        try {
          await service.create(createOrderDto);
        } catch (error) {
          expect(error.status).toBe(403);
          expect(error.message).toBe('Forbidden');
        }
      });
    });

    describe('Update Order', () => {
      const updateOrderDto: UpdateOrderDto = {
        customer_id: 1,
        order_quantity: 1,
        product_id: 1,
      };

      it('should return success when update order', async () => {
        const orderSum = {
          name: 'odol',
          description: 'ini pasta gigi',
          tag: 'pasta gigi',
          quantity: 100,
          id: 61,
          created_at: undefined,
          updated_at: undefined,
        } as unknown as Orders;

        jest
          .spyOn(orderRepository, 'findOneBy')
          .mockResolvedValueOnce(orderStub());

        jest
          .spyOn(productRepository, 'findOneBy')
          .mockResolvedValueOnce(productStub());

        jest
          .spyOn(customerRepository, 'findOneBy')
          .mockResolvedValueOnce(custStub());

        jest.spyOn(productRepository, 'save').mockResolvedValueOnce(undefined);
        jest.spyOn(orderRepository, 'save').mockResolvedValueOnce(orderSum);

        const result = await service.update(1, updateOrderDto);
        expect(result.data).toEqual(orderSum);
      });

      it('should return failed when update order no product', async () => {
        jest
          .spyOn(orderRepository, 'findOneBy')
          .mockResolvedValueOnce(undefined);

        try {
          await service.update(1, updateOrderDto);
        } catch (error) {
          expect(error.status).toBe(403);
          expect(error.message).toBe('Forbidden');
        }
      });
    });

    describe('Delete Order', () => {
      it('should return success when delete order', async () => {
        const mockDeleteResult: DeleteResult = {
          raw: null, // You can set this to null or any other appropriate value
          affected: 1,
        };
        jest
          .spyOn(orderRepository, 'delete')
          .mockResolvedValueOnce(mockDeleteResult);
        const data = await service.remove(1);
        expect(data).toEqual({});
      });
    });
  });
});
