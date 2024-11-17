import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        fullName: string;
        login: string;
        password: string;
        picture: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createUser(email: string, fullName: string, password: string): Promise<{
        id: number;
        email: string;
        fullName: string;
        login: string;
        password: string;
        picture: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createLoginFromEmail(email: string): string;
}
