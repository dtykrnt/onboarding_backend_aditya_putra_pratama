import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseQueryDTO } from 'src/helpers/dto/queries.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   *
   *
   * @param {CreateProductDto} createProductDto
   * @return {*}
   * @memberof ProductsController
   */
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  /**
   *
   *
   * @param {BaseQueryDTO} queriesParam
   * @return {*}
   * @memberof ProductsController
   */
  @Get()
  findAll(@Query() queriesParam: BaseQueryDTO) {
    return this.productsService.findAll(queriesParam);
  }

  /**
   *
   *
   * @param {number} id
   * @return {*}
   * @memberof ProductsController
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  /**
   *
   *
   * @param {number} id
   * @param {UpdateProductDto} updateProductDto
   * @return {*}
   * @memberof ProductsController
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  /**
   *
   *
   * @param {number} id
   * @return {*}
   * @memberof ProductsController
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(+id);
  }
}
