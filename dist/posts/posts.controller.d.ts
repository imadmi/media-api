import { PostsService } from './posts.service';
import { Prisma } from '@prisma/client';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(data: Prisma.PostCreateInput, req: any): Promise<{
        id: number;
        content: string;
        media: string | null;
        authorId: number;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        content: string;
        media: string | null;
        authorId: number;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        content: string;
        media: string | null;
        authorId: number;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: Prisma.PostUpdateInput): Promise<{
        id: number;
        content: string;
        media: string | null;
        authorId: number;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: number;
        content: string;
        media: string | null;
        authorId: number;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
