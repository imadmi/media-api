import { Prisma, Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    getJwt(req: any): string;
    getUserId: (req: Request) => any;
    create(data: any, req: Request): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post | null>;
    update(id: number, data: Prisma.PostUpdateInput): Promise<Post>;
    delete(id: number): Promise<Post>;
}
