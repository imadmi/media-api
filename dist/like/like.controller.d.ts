import { LikeService } from './like.service';
import { PostsService } from 'src/posts/posts.service';
export declare class LikeController {
    private readonly likeService;
    private readonly postsService;
    constructor(likeService: LikeService, postsService: PostsService);
    likePost(postId: number, req: any): Promise<{
        id: number;
        createdAt: Date;
        postId: number;
        userId: number;
    }>;
    unlikePost(postId: number, req: any): Promise<{
        id: number;
        createdAt: Date;
        postId: number;
        userId: number;
    }>;
}
