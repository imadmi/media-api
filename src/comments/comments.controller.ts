import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { PostsService } from 'src/posts/posts.service';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  async create(@Body() data: any, @Req() req: any) {
    const userId = this.postsService.getUserId(req);
    const { postId, content } = data;
    return this.commentsService.createComment(userId, postId, content);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() content: { content: string }) {
    return this.commentsService.updateComment(id, content.content);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.commentsService.deleteComment(id);
  }
}
