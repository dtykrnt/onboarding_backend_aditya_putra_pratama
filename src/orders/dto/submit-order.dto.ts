import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class SubmitOrderDto {
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  // @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  // @IsEmail()
  email: string;
}
