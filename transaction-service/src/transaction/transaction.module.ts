import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, JwtStrategy],
})
export class TransactionModule {}
