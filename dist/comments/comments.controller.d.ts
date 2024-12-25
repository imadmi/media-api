import { CommentsService } from './comments.service';
import { PostsService } from 'src/posts/posts.service';
export declare class CommentsController {
    private readonly commentsService;
    private readonly postsService;
    constructor(commentsService: CommentsService, postsService: PostsService);
    create(data: any, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
    update(id: number, content: {
        content: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
}
