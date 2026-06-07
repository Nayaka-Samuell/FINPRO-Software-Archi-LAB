import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/transaction.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  private extractToken(req: any) {
    return req.headers.authorization;
  }

  // ── CART ──────────────────────────────────────────

  @ApiTags('Cart')
  @ApiOperation({ summary: 'Get user cart with product details' })
  @Get('cart')
  getCart(@Req() req: any) {
    return this.transactionService.getCart(req.user.id, this.extractToken(req));
  }

  @ApiTags('Cart')
  @ApiOperation({ summary: 'Add item to cart' })
  @Post('cart')
  addToCart(@Req() req: any, @Body() data: AddToCartDto) {
    return this.transactionService.addToCart(req.user.id, data, this.extractToken(req));
  }

  @ApiTags('Cart')
  @ApiOperation({ summary: 'Clear all items from cart' })
  @Post('cart/clear')
  clearCart(@Req() req: any) {
    return this.transactionService.clearCart(req.user.id);
  }

  @ApiTags('Cart')
  @ApiOperation({ summary: 'Update item quantity in cart' })
  @Post('cart/:product_id/update')
  updateCartItem(
    @Req() req: any,
    @Param('product_id') productId: string,
    @Body() data: UpdateCartItemDto,
  ) {
    return this.transactionService.updateCartItem(req.user.id, Number(productId), data, this.extractToken(req));
  }

  @ApiTags('Cart')
  @ApiOperation({ summary: 'Remove item from cart' })
  @Post('cart/:product_id/delete')
  deleteCartItem(@Req() req: any, @Param('product_id') productId: string) {
    return this.transactionService.deleteCartItem(req.user.id, Number(productId));
  }

  // ── ORDERS ────────────────────────────────────────

  @ApiTags('Orders')
  @ApiOperation({ summary: 'List all orders for authenticated user' })
  @Get('orders')
  getOrders(@Req() req: any) {
    return this.transactionService.getOrders(req.user.id);
  }

  @ApiTags('Orders')
  @ApiOperation({ summary: 'Checkout: create order from cart' })
  @Post('orders')
  checkout(@Req() req: any) {
    return this.transactionService.checkout(req.user.id, this.extractToken(req));
  }

  // FIX #1: Soal minta POST /orders/:id bukan GET
  @ApiTags('Orders')
  @ApiOperation({ summary: 'Get order detail by ID (product id, name, quantity, price)' })
  @Post('orders/:id')
  getOrderDetails(@Req() req: any, @Param('id') id: string) {
    return this.transactionService.getOrderDetails(req.user.id, Number(id), this.extractToken(req));
  }

  // ── PROFILE ───────────────────────────────────────

  @ApiTags('Profile')
  @ApiOperation({ summary: 'Get authenticated user profile' })
  @Get('profiles')
  getProfile(@Req() req: any) {
    return this.transactionService.getProfile(req.user.id, this.extractToken(req));
  }
}