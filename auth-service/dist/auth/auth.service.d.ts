import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: RegisterDto): Promise<{
        message: string;
    }>;
    login(data: LoginDto): Promise<{
        access_token: string;
    }>;
    getProfile(id: number): Promise<{
        first_name: string;
        last_name: string;
        email: string;
        id: number;
        role: string;
    }>;
}
