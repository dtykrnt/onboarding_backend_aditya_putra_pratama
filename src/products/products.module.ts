import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepositoryImpl } from './repositories/product.repository.impl';
import { ProductsRepository } from './repositories/products.repository';
import { Products } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    { provide: ProductsRepository, useClass: ProductsRepositoryImpl },
  ],
})
export class ProductsModule {}
