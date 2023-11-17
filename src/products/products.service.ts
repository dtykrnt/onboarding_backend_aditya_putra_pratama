import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities';
import { EntityNotFoundError, Repository } from 'typeorm';
import { IResponseJson, Pagination } from 'src/interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<IResponseJson<any>> {
    const data = await this.productRepository.save(createProductDto);
    return { data };
  }

  async findAll(page: number, size: number): Promise<IResponseJson<any>> {
    const builder = this.productRepository.createQueryBuilder();

    const skip = (page - 1) * size;
    const data = await builder.skip(skip).take(size).getMany();
    const len = await builder.getCount();

    const pagination: Pagination = { page, size, total: len };
    return { data, pagination };
  }

  async findOne(id: number): Promise<IResponseJson<any>> {
    const builder = this.productRepository.createQueryBuilder('p');
    const data = await builder.where('p.id = :id', { id }).getOne();
    return { data };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<IResponseJson<any>> {
    const isExist = await this.productRepository.findOneBy({ id });
    if (!isExist) {
      throw new NotFoundException();
    }
    const builder = this.productRepository.createQueryBuilder('products');

    const updateResult = await builder
      .update(Products)
      .set(updateProductDto)
      .where('products.id = :id', { id })
      .execute();

    if (updateResult.affected !== 1) {
      throw new ForbiddenException();
    }

    const data = await this.productRepository.findOneBy({ id });

    return { data };
  }

  async remove(id: number) {
    const deleteBuilder = this.productRepository.createQueryBuilder('products');
    await deleteBuilder.delete().where('products.id = :id', { id }).execute();
    return { data: {} };
  }
}
