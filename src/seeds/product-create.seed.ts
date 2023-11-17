import { Products } from 'src/products/entities';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class ProductCreateSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Products)().createMany(40);
  }
}
