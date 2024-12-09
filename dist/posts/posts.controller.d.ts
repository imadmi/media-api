import { PostsService } from './posts.service';
import { Prisma } from '@prisma/client';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(data: Prisma.PostCreateInput, req: any): Promise<{
        id: number;
        content: string;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        media: string | null;
        parentId: number | null;
    }>;
    findAll(): Promise<{
        id: number;
        content: string;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        media: string | null;
        parentId: number | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        content: string;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        media: string | null;
        parentId: number | null;
    }>;
    update(id: string, data: Prisma.PostUpdateInput): Promise<{
        id: number;
        content: string;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        media: string | null;
        parentId: number | null;
    }>;
    delete(id: string): Promise<{
        id: number;
        content: string;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        media: string | null;
        parentId: number | null;
    }>;
}
