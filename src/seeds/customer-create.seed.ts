import { Customers } from 'src/customers/entity/customers.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as customerData from '../migrations/customers_202311191624.json';

export class CustomerCreateSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // await factory(Customers)().createMany(20);
    await connection.transaction(async (manager) => {
      const ids = customerData.customers.map((c) => c.id);

      const existingCustomers = await manager
        .createQueryBuilder(Customers, 'customer')
        .where('customer.id IN (:...ids)', { ids })
        .getMany();

      const existingIds = existingCustomers.map(
        (existingCustomer) => existingCustomer.id,
      );

      const newCustomers = customerData.customers.filter(
        (item) => !existingIds.includes(item.id),
      );

      await manager
        .createQueryBuilder()
        .insert()
        .into(Customers)
        .values(newCustomers)
        .execute();
    });
  }
}
