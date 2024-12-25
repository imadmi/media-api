import { PrismaService } from 'src/prisma/prisma.service';
export declare class LikeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    likePost(postId: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        postId: number;
        userId: number;
    }>;
    unlikePost(postId: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        postId: number;
        userId: number;
    }>;
}
