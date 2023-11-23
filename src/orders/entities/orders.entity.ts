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

export enum EOrderStatus {
  PENDING = 'pending',
  PROCCESS = 'processing',
  PAID = 'paid',
  COMPLETED = 'completed',
}

export enum EPaymentMethod {
  BANK = 'Bank Transfer',
  EMONEY = 'E-money',
}
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

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ type: 'enum', enum: EOrderStatus, default: EOrderStatus.PENDING })
  status: EOrderStatus;

  @Column({ type: 'enum', enum: EPaymentMethod, default: null, nullable: true })
  payment_method?: EPaymentMethod;

  @Column({ nullable: true })
  transaction_id?: number;

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
