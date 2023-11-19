import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from './entity';
import { Repository, Sort } from 'typeorm';
import { IResponseJson, Pagination } from 'src/interface';
import { CustomersDto } from './dto/customers.dto';
import { ICustomers } from './customers.interface';
import { BaseQueryDTO } from 'src/helpers/dto/queries.dto';
@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) {}

  async findAll(queryParams: BaseQueryDTO): Promise<IResponseJson<ICustomers>> {
    const { page, size, sort, order } = queryParams;
    const builder = this.customerRepository.createQueryBuilder('c');

    const skip = (page - 1) * size;
    const data = await builder
      .orderBy(`c.${order}`, sort)
      .skip(skip)
      .take(size)
      .orderBy(order, sort)
      .getMany();
    const len = await builder.getCount();

    const pagination: Pagination = { page, size, total: len };
    return { data, pagination };
  }

  async findOne(id: number): Promise<IResponseJson<ICustomers>> {
    const builder = this.customerRepository.createQueryBuilder('c');

    const data = await builder.where('c.id = :id', { id }).getOne();

    return { data };
  }
}
