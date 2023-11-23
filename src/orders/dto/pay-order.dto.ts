import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Equal } from 'typeorm';
import { EPaymentMethod } from '../entities';

export class PayOrderDto {
  @IsNotEmpty()
  @IsEnum(EPaymentMethod)
  payment_method: EPaymentMethod;

  @IsNotEmpty()
  @IsNumber()
  order_id: number;
}
