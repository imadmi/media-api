import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<any>;
    register(email: string, fullName: string, password: string): Promise<{
        success: boolean;
        userWithAccessToken: any;
    }>;
    oauth2(email: string, fullName: string, picture: string): Promise<{
        success: boolean;
        userWithAccessToken: any;
    }>;
}
