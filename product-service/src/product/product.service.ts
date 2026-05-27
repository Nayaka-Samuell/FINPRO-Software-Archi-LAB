import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ReduceStockDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany({
      include: { category: true },
    });
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async getProductsByCategory(categoryId: number) {
    const category = await this.prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) throw new NotFoundException('Category not found');

    return this.prisma.product.findMany({
      where: { category_id: categoryId },
      include: { category: true },
    });
  }

  async createProduct(data: CreateProductDto) {
    const category = await this.prisma.category.findUnique({ where: { id: data.category_id } });
    if (!category) {
      throw new BadRequestException('Category ID does not reference an existing category.');
    }
    
    await this.prisma.product.create({ data });
    return { message: 'Product created successfully.' };
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    const category = await this.prisma.category.findUnique({ where: { id: data.category_id } });
    if (!category) {
      throw new BadRequestException('Category ID does not reference an existing category.');
    }

    await this.prisma.product.update({
      where: { id },
      data,
    });
    return { message: 'Product updated successfully.' };
  }

  async reduceStock(id: number, data: ReduceStockDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    if (data.quantity > product.stock) {
      throw new BadRequestException(`Requested quantity (${data.quantity}) exceeds current stock (${product.stock}).`);
    }

    const newStock = product.stock - data.quantity;
    await this.prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
    
    return { message: `Product stock reduced by ${data.quantity}. New stock: ${newStock}.` };
  }

  async deleteProduct(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    await this.prisma.product.delete({ where: { id } });
    return { message: 'Product deleted successfully.' };
  }
}
