import { PrismaService } from 'src/prisma/prisma.service';
export declare class LikeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    likePost(postId: number, userId: number): Promise<{
        id: number;
        postId: number;
        userId: number;
        createdAt: Date;
    }>;
    unlikePost(postId: number, userId: number): Promise<{
        id: number;
        postId: number;
        userId: number;
        createdAt: Date;
    }>;
}
