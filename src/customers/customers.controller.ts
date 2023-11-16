import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ResponsesInterceptors } from 'src/helpers/interceptors/responses.interceptors';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getAll() {
    return this.customersService.findAll();
  }
}
