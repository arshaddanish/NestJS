import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  fetchProducts() {
    return this.productsService.fetchProducts();
  }

  @Get(':id')
  fetchProduct(@Param('id') id: string) {
    return this.productsService.fetchProduct(id);
  }

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('desc') desc: string,
    @Body('price') price: number,
  ) {
    return this.productsService.addProduct(title, desc, price);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Req() req) {
    return this.productsService.updateProduct(id, req.body);
  }

  @Delete()
  deleteProducts() {
    return this.productsService.deleteProducts();
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
