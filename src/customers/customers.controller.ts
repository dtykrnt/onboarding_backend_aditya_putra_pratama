import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { BaseQueryDTO } from 'src/helpers/dto/queries.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getAll(@Query() queryParams: BaseQueryDTO) {
    return this.customersService.findAll(queryParams);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }
}
