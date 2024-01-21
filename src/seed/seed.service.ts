import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    await this.insertNewProducts();
    return 'Seed Excuted';
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertsPromises = [];

    products.forEach((product) => {
      insertsPromises.push(this.productService.create(product));
    });

    await Promise.all(insertsPromises);

    return true;
  }
}
