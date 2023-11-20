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
import { Orders } from './entities/orders.entity';
import { BaseQueryDTO } from 'src/helpers/dto/queries.dto';
import { Pagination } from 'src/interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const product = await this.productRepository.findOneBy({
      id: createOrderDto.product_id,
    });

    if (!product) {
      throw new NotFoundException();
    }

    if (createOrderDto.order_quantity > product.quantity) {
      throw new ForbiddenException();
    }

    if (product.quantity == 0) {
      throw new ForbiddenException();
    }

    const orders = new Orders();
    orders.quantity = createOrderDto.order_quantity;
    orders.product = product;

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
      .take(size)
      .skip(skip)
      .getManyAndCount();

    const len = await builder.getCount();

    const pagination: Pagination = { page, size, total };
    return { data, pagination };
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
