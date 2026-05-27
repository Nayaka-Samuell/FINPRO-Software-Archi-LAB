import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class PayOrderDto {
  @IsNotEmpty()
  payment_method: string;

  @IsNotEmpty()
  amount: number;
}
