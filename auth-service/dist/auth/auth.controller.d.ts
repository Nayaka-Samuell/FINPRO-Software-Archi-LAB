import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(data: RegisterDto): Promise<{
        message: string;
    }>;
    login(data: LoginDto): Promise<{
        access_token: string;
    }>;
    getProfile(id: string): Promise<{
        first_name: string;
        last_name: string;
        email: string;
        id: number;
        role: string;
    }>;
}
