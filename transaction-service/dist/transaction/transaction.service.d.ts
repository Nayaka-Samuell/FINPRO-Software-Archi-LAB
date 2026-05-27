import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/transaction.dto';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    private fetchProduct;
    private reduceProductStock;
    getCart(userId: number, token: string): Promise<{
        cart_id: number;
        items: {
            cart_item_id: number;
            product_id: number;
            name: any;
            price: any;
            quantity: number;
            subtotal: number;
        }[];
    }>;
    addToCart(userId: number, data: AddToCartDto, token: string): Promise<{
        message: string;
    }>;
    clearCart(userId: number): Promise<{
        message: string;
    }>;
    updateCartItem(userId: number, productId: number, data: UpdateCartItemDto, token: string): Promise<{
        message: string;
    }>;
    deleteCartItem(userId: number, productId: number): Promise<{
        message: string;
    }>;
    checkout(userId: number, token: string): Promise<{
        message: string;
        order_id: number;
        created_at: Date;
    }>;
    getOrders(userId: number): Promise<({
        orderDetails: {
            product_id: number;
            quantity: number;
            id: number;
            price: number;
            order_id: number;
        }[];
    } & {
        id: number;
        user_id: number;
        created_at: Date;
        status: string;
    })[]>;
    getOrderDetails(userId: number, orderId: number, token: string): Promise<{
        order_id: number;
        created_at: Date;
        items: {
            order_detail_id: number;
            product_id: number;
            name: any;
            quantity: number;
            price: number;
            subtotal: number;
        }[];
        total: number;
    }>;
    getProfile(userId: number, token: string): Promise<any>;
    payOrder(userId: number, orderId: number, paymentMethod: string, amount: number): Promise<{
        message: string;
        payment: {
            payment_method: string;
            amount: number;
            id: number;
            status: string;
            order_id: number;
            payment_date: Date;
        };
    }>;
}
