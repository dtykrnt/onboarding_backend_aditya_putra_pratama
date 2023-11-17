import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  tag: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
