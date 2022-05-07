import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel) {}

  async addProduct(title: string, desc: string, price: number) {
    const product = new this.productModel({
      title,
      desc,
      price,
    });
    return await product.save();
  }

  async fetchProducts() {
    return await this.productModel.find({});
  }

  async fetchProduct(id: string) {
    return await this.productModel.findById(id);
  }

  async updateProduct(id: string, reqBody) {
    return await this.productModel.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
  }

  async deleteProducts() {
    return await this.productModel.deleteMany({});
  }

  async deleteProduct(id: string) {
    return await this.productModel.deleteOne({ _id: id });
  }
}
