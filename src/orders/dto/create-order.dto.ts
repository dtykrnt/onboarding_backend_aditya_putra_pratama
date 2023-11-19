import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  order_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;
}
