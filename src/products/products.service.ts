import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, desc: string, price: number) {
    const id = uuidv4();
    const product = new Product(id, title, desc, price);
    this.products.push(product);
    return id;
  }

  fetchProducts() {
    return [...this.products];
  }

  fetchProduct(id: string) {
    const product = this.findProduct(id)[0];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return { ...product };
  }

  updateProduct(id: string, title: string, desc: string, price: number) {
    const [product, productIndex] = this.findProduct(id);
    const newProduct = { ...product };
    if (title) {
      newProduct.title = title;
    }
    if (desc) {
      newProduct.desc = desc;
    }
    if (price) {
      newProduct.price = price;
    }

    this.products[productIndex] = newProduct;
    return { ...this.products[productIndex] };
  }

  deleteProduct(id: string) {
    const productIndex = this.findProduct(id)[1];
    this.products.splice(productIndex, 1);
    return null;
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((item) => item.id === id);
    const product = this.products[productIndex];
    return [product, productIndex];
  }
}
