import { IResponseJson } from 'src/interface';
import { IProducts } from '../products.interface';

export abstract class ProductsRepository<T> {
  abstract updateProduct(id: number, string): Promise<IResponseJson<T>>;
}
