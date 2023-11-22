import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteOrderDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
