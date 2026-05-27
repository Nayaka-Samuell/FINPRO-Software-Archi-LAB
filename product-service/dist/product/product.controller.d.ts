import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto, ReduceStockDto } from './dto/product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
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
    getProductById(id: string): Promise<{
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
    getProductsByCategory(categoryId: string): Promise<({
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
    updateProduct(id: string, data: UpdateProductDto): Promise<{
        message: string;
    }>;
    reduceStock(id: string, data: ReduceStockDto): Promise<{
        message: string;
    }>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
}
