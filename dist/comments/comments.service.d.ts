import { PrismaService } from 'src/prisma/prisma.service';
export declare class CommentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createComment(userId: number, postId: number, content: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
    updateComment(id: number, content: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
    deleteComment(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
}
