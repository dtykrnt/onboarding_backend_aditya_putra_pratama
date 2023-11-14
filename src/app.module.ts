import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { OrdersModule } from './orders/orders.module';
import { SeedersModule } from './seeders/seeders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './customers/entities/customers.entities';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    ProductsModule,
    TransactionsModule,
    OrdersModule,
    SeedersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'onboarding_database',
      entities: [Customers],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CustomersModule]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
