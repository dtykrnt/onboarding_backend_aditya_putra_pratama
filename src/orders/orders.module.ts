import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { Products } from 'src/products/entities';
import { Customers } from 'src/customers/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Products, Customers])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
