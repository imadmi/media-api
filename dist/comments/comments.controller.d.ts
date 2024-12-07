import { CommentsService } from './comments.service';
import { PostsService } from 'src/posts/posts.service';
export declare class CommentsController {
    private readonly commentsService;
    private readonly postsService;
    constructor(commentsService: CommentsService, postsService: PostsService);
    create(data: any, req: any): Promise<{
        id: number;
        content: string;
        postId: number;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, content: {
        content: string;
    }): Promise<{
        id: number;
        content: string;
        postId: number;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: number): Promise<{
        id: number;
        content: string;
        postId: number;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
