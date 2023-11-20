import { Customers } from 'src/customers/entity';
import { Products } from 'src/products/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Products, (product) => product.orders)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Products;

  @ManyToOne(() => Customers, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customers;
}
