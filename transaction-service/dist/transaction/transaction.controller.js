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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transaction_service_1 = require("./transaction.service");
const transaction_dto_1 = require("./dto/transaction.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
let TransactionController = class TransactionController {
    transactionService;
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    extractToken(req) {
        return req.headers.authorization;
    }
    getCart(req) {
        return this.transactionService.getCart(req.user.id, this.extractToken(req));
    }
    addToCart(req, data) {
        return this.transactionService.addToCart(req.user.id, data, this.extractToken(req));
    }
    clearCart(req) {
        return this.transactionService.clearCart(req.user.id);
    }
    updateCartItem(req, productId, data) {
        return this.transactionService.updateCartItem(req.user.id, Number(productId), data, this.extractToken(req));
    }
    deleteCartItem(req, productId) {
        return this.transactionService.deleteCartItem(req.user.id, Number(productId));
    }
    getOrders(req) {
        return this.transactionService.getOrders(req.user.id);
    }
    checkout(req) {
        return this.transactionService.checkout(req.user.id, this.extractToken(req));
    }
    getOrderDetails(req, id) {
        return this.transactionService.getOrderDetails(req.user.id, Number(id), this.extractToken(req));
    }
    getProfile(req) {
        return this.transactionService.getProfile(req.user.id, this.extractToken(req));
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user cart with product details' }),
    (0, common_1.Get)('cart'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getCart", null);
__decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Add item to cart' }),
    (0, common_1.Post)('cart'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transaction_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "addToCart", null);
__decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Clear all items from cart' }),
    (0, common_1.Post)('cart/clear'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "clearCart", null);
__decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Update item quantity in cart' }),
    (0, common_1.Post)('cart/:product_id/update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('product_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, transaction_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "updateCartItem", null);
__decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove item from cart' }),
    (0, common_1.Post)('cart/:product_id/delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "deleteCartItem", null);
__decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, swagger_1.ApiOperation)({ summary: 'List all orders for authenticated user' }),
    (0, common_1.Get)('orders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getOrders", null);
__decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, swagger_1.ApiOperation)({ summary: 'Checkout: create order from cart' }),
    (0, common_1.Post)('orders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "checkout", null);
__decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order detail by ID (product id, name, quantity, price)' }),
    (0, common_1.Post)('orders/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getOrderDetails", null);
__decorate([
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get authenticated user profile' }),
    (0, common_1.Get)('profiles'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getProfile", null);
exports.TransactionController = TransactionController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map