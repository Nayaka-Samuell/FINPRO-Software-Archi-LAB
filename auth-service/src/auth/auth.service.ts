import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new BadRequestException('Email is already registered.');
    }

    await this.prisma.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password, // Stored as plain text per requirements
        role: 'CUSTOMER',
      },
    });

    return { message: 'User registered successfully.' };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email not found.');
    }

    if (user.password !== data.password) {
      throw new UnauthorizedException('Password does not match.');
    }

    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
