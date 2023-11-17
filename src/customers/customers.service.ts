import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from './entity';
import { Repository } from 'typeorm';
import { IResponseJson, Pagination } from 'src/interface';
import { CustomersDto } from './dto/customers.dto';
import { ICustomers } from './customers.interface';
@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) {}

  async findAll(
    page: number,
    size: number,
  ): Promise<IResponseJson<ICustomers>> {
    const builder = this.customerRepository.createQueryBuilder();

    const skip = (page - 1) * size;
    const data = await builder.skip(skip).take(size).getMany();
    const len = await builder.getCount();

    const pagination: Pagination = { page, size, total: len };
    return { data, pagination };
  }

  async findOne(id: number): Promise<IResponseJson<ICustomers>> {
    const builder = this.customerRepository.createQueryBuilder('cust');

    const data = await builder.where('cust.id = :id', { id }).getOne();

    return { data };
  }
}
