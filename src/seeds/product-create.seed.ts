import { Products } from 'src/products/entities';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as productData from '../migrations/products_202311191659.json';

export class ProductCreateSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // await factory(Products)().createMany(20);
    await connection.transaction(async (manager) => {
      const ids = productData.products.map((c) => c.id);

      const existingProduct = await manager
        .createQueryBuilder(Products, 'product')
        .where('product.id IN (:...ids)', { ids })
        .getMany();

      const existingIds = existingProduct.map(
        (existingCustomer) => existingCustomer.id,
      );

      const newProduct = productData.products.filter(
        (item) => !existingIds.includes(item.id),
      );

      await manager
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(newProduct)
        .execute();
    });
  }
}
