import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities';
import { Repository } from 'typeorm';
import { EOrderStatus, EPaymentMethod, Orders } from './entities/orders.entity';
import { BaseQueryDTO } from 'src/helpers/dto/queries.dto';
import { Pagination } from 'src/interface';
import { Customers } from 'src/customers/entity';
import { SubmitOrderDto } from './dto';
import { PayOrderDto } from './dto/pay-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const product = await this.productRepository.findOneBy({
      id: createOrderDto.product_id,
    });

    const customer = await this.customerRepository.findOneBy({
      id: createOrderDto.customer_id,
    });

    if (!customer) {
      throw new ForbiddenException();
    }

    if (!product) {
      throw new NotFoundException();
    }

    if (product.quantity == 0) {
      throw new ForbiddenException();
    }

    if (createOrderDto.order_quantity > product.quantity) {
      throw new ForbiddenException();
    }

    const existingOrder = await this.orderRepository.findOneBy({
      product: {
        id: createOrderDto.product_id,
      },
      customer: {
        id: createOrderDto.customer_id,
      },
    });

    if (existingOrder.status === EOrderStatus.PROCCESS) {
      throw new ForbiddenException();
    }

    if (existingOrder) {
      existingOrder.quantity += createOrderDto.order_quantity;
      product.quantity -= createOrderDto.order_quantity;

      await this.productRepository.save(product);
      const data = await this.orderRepository.save(existingOrder);
      return { data };
    }

    const orders = new Orders();
    orders.quantity = createOrderDto.order_quantity;
    orders.product = product;
    orders.customer = customer;

    product.quantity -= createOrderDto.order_quantity;

    await this.productRepository.save(product);
    const data = await this.orderRepository.save(orders);
    return { data };
  }

  async findAll(queriesParam: BaseQueryDTO) {
    const { page, size, sort, order, search } = queriesParam;
    const skip = (page - 1) * size;

    const builder = this.orderRepository.createQueryBuilder('o');

    if (search) {
      builder.where('o.name ILIKE :search', { search: `%${search}%` });
    }

    if (order) {
      builder.orderBy(`o.${order}`, sort);
    }

    const [data, total] = await builder
      .leftJoinAndSelect('o.product', 'product')
      .leftJoinAndSelect('o.customer', 'customer')
      .take(size)
      .skip(skip)
      .getManyAndCount();

    const pagination: Pagination = { page, size, total };
    return { data, pagination };
  }

  async findOne(id: number) {
    const data = await this.orderRepository.findOneBy({ id });
    return { data };
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new ForbiddenException();
    }

    const product = await this.productRepository.findOneBy({
      id: order.product.id,
    });

    if (!product) {
      throw new ForbiddenException();
    }

    order.quantity += updateOrderDto.order_quantity;
    product.quantity -= updateOrderDto.order_quantity;

    await this.productRepository.save(product);
    const data = await this.orderRepository.save(order);
    return { data };
  }

  async remove(id: number) {
    const result = await this.orderRepository.delete({ id });
    if (result.affected == 1) {
      return {};
    }
    return {};
  }

  async submit(dto: SubmitOrderDto) {
    const order = await this.orderRepository.findOneBy({
      id: dto.order_id,
    });

    if (!order) {
      throw new NotFoundException();
    }

    if (order.status === EOrderStatus.PROCCESS) {
      throw new ForbiddenException();
    }

    order.name = dto.name;
    order.email = dto.email;
    order.phone_number = dto.phone_number;
    order.status = EOrderStatus.PROCCESS;

    const data = await this.orderRepository.save(order);

    return { data };
  }

  async pay(dto: PayOrderDto) {
    const order = await this.orderRepository.findOneBy({
      id: dto.order_id,
    });

    if (!order) {
      throw new NotFoundException();
    }

    const isBankPaymentMethod = dto.payment_method === EPaymentMethod.BANK;

    if (!isBankPaymentMethod) {
      throw new ForbiddenException();
    }

    const isInProcess = order.status === EOrderStatus.PROCCESS;

    if (!isInProcess) {
      throw new ForbiddenException();
    }

    const isPaid = order.status === EOrderStatus.PAID;

    if (isPaid) {
      throw new ForbiddenException();
    }

    order.status = EOrderStatus.PAID;
    order.payment_method = dto.payment_method;

    let transactionId = Math.random() * 100;

    order.transaction_id = Math.round(transactionId);

    const data = await this.orderRepository.save(order);

    return { data };
  }
}
