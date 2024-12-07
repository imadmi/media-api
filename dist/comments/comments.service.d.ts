import { PrismaService } from 'src/prisma/prisma.service';
export declare class CommentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createComment(userId: number, postId: number, content: string): Promise<{
        id: number;
        content: string;
        postId: number;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateComment(id: number, content: string): Promise<{
        id: number;
        content: string;
        postId: number;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteComment(id: number): Promise<{
        id: number;
        content: string;
        postId: number;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
