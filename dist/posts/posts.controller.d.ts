import { PostsService } from './posts.service';
import { Prisma } from '@prisma/client';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(data: Prisma.PostCreateInput, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        media: string | null;
        authorId: number;
        parentId: number | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        media: string | null;
        authorId: number;
        parentId: number | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        media: string | null;
        authorId: number;
        parentId: number | null;
    }>;
    update(id: string, data: Prisma.PostUpdateInput): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        media: string | null;
        authorId: number;
        parentId: number | null;
    }>;
    delete(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        media: string | null;
        authorId: number;
        parentId: number | null;
    }>;
}
