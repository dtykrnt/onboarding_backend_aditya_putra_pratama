import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from './entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/interface';
@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) {}

  async findAll() {
    const data = await this.customerRepository
      .createQueryBuilder()
      .take(10)
      .getMany();

    return data;
  }
}
