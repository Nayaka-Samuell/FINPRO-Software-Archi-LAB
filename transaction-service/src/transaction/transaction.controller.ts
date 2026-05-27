import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AddToCartDto, UpdateCartItemDto, PayOrderDto } from './dto/transaction.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  private extractToken(req: any) {
    return req.headers.authorization;
  }

  @Get('cart')
  getCart(@Req() req: any) {
    return this.transactionService.getCart(req.user.id, this.extractToken(req));
  }

  @Post('cart')
  addToCart(@Req() req: any, @Body() data: AddToCartDto) {
    return this.transactionService.addToCart(req.user.id, data, this.extractToken(req));
  }

  @Post('cart/clear')
  clearCart(@Req() req: any) {
    return this.transactionService.clearCart(req.user.id);
  }

  @Post('cart/:product_id/update')
  updateCartItem(@Req() req: any, @Param('product_id') productId: string, @Body() data: UpdateCartItemDto) {
    return this.transactionService.updateCartItem(req.user.id, Number(productId), data, this.extractToken(req));
  }

  @Post('cart/:product_id/delete')
  deleteCartItem(@Req() req: any, @Param('product_id') productId: string) {
    return this.transactionService.deleteCartItem(req.user.id, Number(productId));
  }

  @Get('orders')
  getOrders(@Req() req: any) {
    return this.transactionService.getOrders(req.user.id);
  }

  @Post('orders')
  checkout(@Req() req: any) {
    return this.transactionService.checkout(req.user.id, this.extractToken(req));
  }

  @Post('orders/:id')
  getOrderDetails(@Req() req: any, @Param('id') id: string) {
    return this.transactionService.getOrderDetails(req.user.id, Number(id), this.extractToken(req));
  }

  @Get('profiles')
  getProfile(@Req() req: any) {
    return this.transactionService.getProfile(req.user.id, this.extractToken(req));
  }

  @Post('orders/:id/pay')
  payOrder(@Req() req: any, @Param('id') id: string, @Body() data: PayOrderDto) {
    return this.transactionService.payOrder(req.user.id, Number(id), data.payment_method, data.amount);
  }
}
