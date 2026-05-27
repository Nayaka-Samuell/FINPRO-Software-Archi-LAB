import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ReduceStockDto } from './dto/product.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllProducts(): Promise<({
        category: {
            name: string;
            id: number;
        };
    } & {
        name: string;
        description: string;
        price: number;
        stock: number;
        image_url: string | null;
        category_id: number;
        id: number;
    })[]>;
    getProductById(id: number): Promise<{
        category: {
            name: string;
            id: number;
        };
    } & {
        name: string;
        description: string;
        price: number;
        stock: number;
        image_url: string | null;
        category_id: number;
        id: number;
    }>;
    getAllCategories(): Promise<{
        name: string;
        id: number;
    }[]>;
    getProductsByCategory(categoryId: number): Promise<({
        category: {
            name: string;
            id: number;
        };
    } & {
        name: string;
        description: string;
        price: number;
        stock: number;
        image_url: string | null;
        category_id: number;
        id: number;
    })[]>;
    createProduct(data: CreateProductDto): Promise<{
        message: string;
    }>;
    updateProduct(id: number, data: UpdateProductDto): Promise<{
        message: string;
    }>;
    reduceStock(id: number, data: ReduceStockDto): Promise<{
        message: string;
    }>;
    deleteProduct(id: number): Promise<{
        message: string;
    }>;
}
