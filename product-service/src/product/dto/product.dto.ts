import { IsString, IsNotEmpty, Validate, MinLength, IsNumber, Min, IsInt, Max, IsOptional, IsUrl } from 'class-validator';
import { IsAtLeastThreeWords } from '../../validators/is-at-least-three-words.validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Validate(IsAtLeastThreeWords)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(999)
  stock: number;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  category_id: number;
}

export class UpdateProductDto extends CreateProductDto {}

export class ReduceStockDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}
