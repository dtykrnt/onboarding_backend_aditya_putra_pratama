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
import { ChatsModule } from './chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';

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
    ChatsModule,
    MongooseModule.forRoot('mongodb://localhost:27017', {
      user: 'root',
      pass: '123',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
