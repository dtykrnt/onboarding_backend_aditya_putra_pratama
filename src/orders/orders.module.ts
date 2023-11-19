import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { Products } from 'src/products/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Products])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
