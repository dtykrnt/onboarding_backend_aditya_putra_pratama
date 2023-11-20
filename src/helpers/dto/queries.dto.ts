import { Transform } from 'class-transformer';
import { IsOptional, IsArray, IsString, IsNumber } from 'class-validator';

export class BaseQueryDTO {
  @IsOptional()
  @IsArray()
  select?: string[];

  @IsOptional()
  @IsArray()
  statuses?: string[];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  search_by?: string;

  @IsOptional()
  @IsString()
  order?: string;

  @IsOptional()
  @IsString()
  sort?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  size: number = 10;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page: number = 1;

  with_deleted?: boolean;
}
