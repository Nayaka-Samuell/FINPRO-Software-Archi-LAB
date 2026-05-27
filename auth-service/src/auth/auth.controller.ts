import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.authService.getProfile(Number(id));
  }
}
