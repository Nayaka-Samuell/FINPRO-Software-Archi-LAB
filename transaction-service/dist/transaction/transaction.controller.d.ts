import { TransactionService } from './transaction.service';
import { AddToCartDto, UpdateCartItemDto, PayOrderDto } from './dto/transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    private extractToken;
    getCart(req: any): Promise<{
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
    addToCart(req: any, data: AddToCartDto): Promise<{
        message: string;
    }>;
    clearCart(req: any): Promise<{
        message: string;
    }>;
    updateCartItem(req: any, productId: string, data: UpdateCartItemDto): Promise<{
        message: string;
    }>;
    deleteCartItem(req: any, productId: string): Promise<{
        message: string;
    }>;
    getOrders(req: any): Promise<({
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
    checkout(req: any): Promise<{
        message: string;
        order_id: number;
        created_at: Date;
    }>;
    getOrderDetails(req: any, id: string): Promise<{
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
    getProfile(req: any): Promise<any>;
    payOrder(req: any, id: string, data: PayOrderDto): Promise<{
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
