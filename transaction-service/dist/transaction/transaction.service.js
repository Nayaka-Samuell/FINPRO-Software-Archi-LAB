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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TransactionService = class TransactionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async fetchProduct(productId, token) {
        const res = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products/${productId}`, {
            headers: { Authorization: token },
        });
        if (!res.ok) {
            if (res.status === 404)
                throw new common_1.NotFoundException('Product not found');
            throw new common_1.BadRequestException('Failed to fetch product details');
        }
        return res.json();
    }
    async reduceProductStock(productId, quantity, token) {
        const res = await fetch(`${process.env.PRODUCT_SERVICE_URL}/admin/products/${productId}/reduce`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({ quantity }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new common_1.BadRequestException(errorData.message || 'Failed to reduce stock');
        }
        return res.json();
    }
    async getCart(userId, token) {
        let cart = await this.prisma.cart.findFirst({
            where: { user_id: userId },
            include: { cartItems: true },
        });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: { user_id: userId },
                include: { cartItems: true },
            });
        }
        const items = await Promise.all(cart.cartItems.map(async (item) => {
            const product = await this.fetchProduct(item.product_id, token);
            return {
                cart_item_id: item.id,
                product_id: item.product_id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                subtotal: product.price * item.quantity,
            };
        }));
        return { cart_id: cart.id, items };
    }
    async addToCart(userId, data, token) {
        const product = await this.fetchProduct(data.product_id, token);
        if (data.quantity > product.stock) {
            throw new common_1.BadRequestException(`Quantity (${data.quantity}) exceeds product stock (${product.stock}).`);
        }
        let cart = await this.prisma.cart.findFirst({ where: { user_id: userId } });
        if (!cart) {
            cart = await this.prisma.cart.create({ data: { user_id: userId } });
        }
        const existingItem = await this.prisma.cartItem.findFirst({
            where: { cart_id: cart.id, product_id: data.product_id },
        });
        if (existingItem) {
            throw new common_1.BadRequestException('Product already exists in cart. Use update instead.');
        }
        await this.prisma.cartItem.create({
            data: {
                cart_id: cart.id,
                product_id: data.product_id,
                quantity: data.quantity,
            },
        });
        return { message: 'Item added to cart successfully.' };
    }
    async clearCart(userId) {
        const cart = await this.prisma.cart.findFirst({ where: { user_id: userId } });
        if (cart) {
            await this.prisma.cartItem.deleteMany({ where: { cart_id: cart.id } });
        }
        return { message: 'Cart cleared successfully.' };
    }
    async updateCartItem(userId, productId, data, token) {
        const product = await this.fetchProduct(productId, token);
        if (data.quantity > product.stock) {
            throw new common_1.BadRequestException(`Quantity (${data.quantity}) exceeds product stock (${product.stock}).`);
        }
        const cart = await this.prisma.cart.findFirst({ where: { user_id: userId } });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        const item = await this.prisma.cartItem.findFirst({
            where: { cart_id: cart.id, product_id: productId },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found in cart');
        await this.prisma.cartItem.update({
            where: { id: item.id },
            data: { quantity: data.quantity },
        });
        return { message: 'Cart item updated successfully.' };
    }
    async deleteCartItem(userId, productId) {
        const cart = await this.prisma.cart.findFirst({ where: { user_id: userId } });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        const item = await this.prisma.cartItem.findFirst({
            where: { cart_id: cart.id, product_id: productId },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found in cart');
        await this.prisma.cartItem.delete({ where: { id: item.id } });
        return { message: 'Item removed from cart successfully.' };
    }
    async checkout(userId, token) {
        const cart = await this.prisma.cart.findFirst({
            where: { user_id: userId },
            include: { cartItems: true },
        });
        if (!cart || cart.cartItems.length === 0) {
            throw new common_1.BadRequestException('Your cart is empty. Add items before checking out.');
        }
        const orderDetailsData = [];
        for (const item of cart.cartItems) {
            const product = await this.fetchProduct(item.product_id, token);
            await this.reduceProductStock(item.product_id, item.quantity, token);
            orderDetailsData.push({
                product_id: item.product_id,
                price: product.price,
                quantity: item.quantity,
            });
        }
        const order = await this.prisma.order.create({
            data: {
                user_id: userId,
                orderDetails: {
                    create: orderDetailsData,
                },
            },
        });
        await this.prisma.cartItem.deleteMany({ where: { cart_id: cart.id } });
        return {
            message: 'Checkout successful.',
            order_id: order.id,
            created_at: order.created_at,
        };
    }
    async getOrders(userId) {
        return this.prisma.order.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
            include: { orderDetails: true },
        });
    }
    async getOrderDetails(userId, orderId, token) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { orderDetails: true },
        });
        if (!order || order.user_id !== userId) {
            throw new common_1.NotFoundException('Order not found');
        }
        let total = 0;
        const items = await Promise.all(order.orderDetails.map(async (detail) => {
            const product = await this.fetchProduct(detail.product_id, token);
            const subtotal = detail.price * detail.quantity;
            total += subtotal;
            return {
                order_detail_id: detail.id,
                product_id: detail.product_id,
                name: product.name,
                quantity: detail.quantity,
                price: detail.price,
                subtotal,
            };
        }));
        return {
            order_id: order.id,
            created_at: order.created_at,
            items,
            total,
        };
    }
    async getProfile(userId, token) {
        const res = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/profile/${userId}`, {
            headers: { Authorization: token },
        });
        if (!res.ok) {
            throw new common_1.BadRequestException('Failed to fetch profile');
        }
        return res.json();
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map