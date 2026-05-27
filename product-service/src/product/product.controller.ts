import { Controller, Get, Post, Body, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto, ReduceStockDto } from './dto/product.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('products/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }

  @Get('categories')
  getAllCategories() {
    return this.productService.getAllCategories();
  }

  @Get('categories/:categoryId/products')
  getProductsByCategory(@Param('categoryId') categoryId: string) {
    return this.productService.getProductsByCategory(Number(categoryId));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('admin/products')
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('admin/products/:id/update')
  updateProduct(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productService.updateProduct(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'CUSTOMER')
  @Post('admin/products/:id/reduce')
  reduceStock(@Param('id') id: string, @Body() data: ReduceStockDto) {
    return this.productService.reduceStock(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('admin/products/:id/delete')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(Number(id));
  }
}
