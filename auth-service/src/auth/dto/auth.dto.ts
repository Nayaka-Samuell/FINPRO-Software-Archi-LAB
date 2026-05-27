import { IsEmail, IsNotEmpty, IsAlpha, Validate } from 'class-validator';
import { IsValidEmailDomain } from '../../validators/is-valid-email-domain.validator';
import { IsValidPassword } from '../../validators/is-valid-password.validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsAlpha()
  first_name: string;

  @IsNotEmpty()
  @IsAlpha()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsValidEmailDomain)
  email: string;

  @IsNotEmpty()
  @Validate(IsValidPassword)
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
