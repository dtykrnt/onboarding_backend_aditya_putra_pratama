import { DataSource, Repository } from 'typeorm';
import { Products } from '../entities';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';
import { IResponseJson } from 'src/interface';
import { IProducts } from '../products.interface';

@Injectable()
export class ProductsRepository extends Repository<Products> {
  constructor(private dataSource: DataSource) {
    super(Products, dataSource.createEntityManager());
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<IResponseJson<IProducts>> {
    const isExist = await this.findOneBy({ id });
    if (!isExist) {
      throw new NotFoundException();
    }
    const builder = this.createQueryBuilder('products');

    const updateResult = await builder
      .update(Products)
      .set(updateProductDto)
      .where('products.id = :id', { id })
      .execute();

    if (updateResult.affected !== 1) {
      throw new ForbiddenException();
    }

    const data = await this.findOneBy({ id });

    return { data };
  }
}
