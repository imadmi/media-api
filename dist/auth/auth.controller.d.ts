import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: any): Promise<any>;
    signup(body: any): Promise<{
        success: boolean;
        userWithAccessToken: any;
    }>;
    oauth2(body: any): Promise<{
        success: boolean;
        userWithAccessToken: any;
    }>;
}
