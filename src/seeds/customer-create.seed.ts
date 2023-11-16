import { Customers } from 'src/customers/entity/customers.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CustomerCreateSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Customers)().createMany(20);
  }
}
