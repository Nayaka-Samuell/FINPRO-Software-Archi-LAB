import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, JwtStrategy],
})
export class ProductModule {}
