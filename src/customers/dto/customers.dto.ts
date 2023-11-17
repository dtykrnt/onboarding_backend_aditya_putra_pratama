import { IsNotEmpty } from 'class-validator';

export class CustomersDto {
  @IsNotEmpty()
  id: number;
}
