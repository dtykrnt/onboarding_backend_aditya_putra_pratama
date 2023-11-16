import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './helpers/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    CustomersModule,
    TransactionsModule,
    OrdersModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
