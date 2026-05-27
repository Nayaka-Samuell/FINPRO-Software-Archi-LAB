"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllProducts() {
        return this.prisma.product.findMany({
            include: { category: true },
        });
    }
    async getProductById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async getAllCategories() {
        return this.prisma.category.findMany();
    }
    async getProductsByCategory(categoryId) {
        const category = await this.prisma.category.findUnique({ where: { id: categoryId } });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return this.prisma.product.findMany({
            where: { category_id: categoryId },
            include: { category: true },
        });
    }
    async createProduct(data) {
        const category = await this.prisma.category.findUnique({ where: { id: data.category_id } });
        if (!category) {
            throw new common_1.BadRequestException('Category ID does not reference an existing category.');
        }
        await this.prisma.product.create({ data });
        return { message: 'Product created successfully.' };
    }
    async updateProduct(id, data) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const category = await this.prisma.category.findUnique({ where: { id: data.category_id } });
        if (!category) {
            throw new common_1.BadRequestException('Category ID does not reference an existing category.');
        }
        await this.prisma.product.update({
            where: { id },
            data,
        });
        return { message: 'Product updated successfully.' };
    }
    async reduceStock(id, data) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (data.quantity > product.stock) {
            throw new common_1.BadRequestException(`Requested quantity (${data.quantity}) exceeds current stock (${product.stock}).`);
        }
        const newStock = product.stock - data.quantity;
        await this.prisma.product.update({
            where: { id },
            data: { stock: newStock },
        });
        return { message: `Product stock reduced by ${data.quantity}. New stock: ${newStock}.` };
    }
    async deleteProduct(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        await this.prisma.product.delete({ where: { id } });
        return { message: 'Product deleted successfully.' };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map