import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from 'src/posts/posts.service';

@Controller('like')
@UseGuards(AuthGuard('jwt'))
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly postsService: PostsService,
  ) {}

  @Post(':postId')
  async likePost(@Param('postId') postId: number, @Req() req: any) {
    const userId = this.postsService.getUserId(req);
    return this.likeService.likePost(Number(postId), userId);
  }

  @Delete(':postId')
  async unlikePost(@Param('postId') postId: number, @Req() req: any) {
    const userId = this.postsService.getUserId(req);
    return this.likeService.unlikePost(Number(postId), userId);
  }
}
