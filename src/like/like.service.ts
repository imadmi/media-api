import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(postId: number, userId: number) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id: postId } });

      if (!post) {
        console.error('Post not found for postId:', postId);
        throw new NotFoundException('Post not found');
      }

      const existingLike = await this.prisma.like.findFirst({
        where: {
          postId,
          userId,
        },
      });

      if (existingLike) {
        console.error('User already liked the post:', { postId, userId });
        throw new Error('You already liked this post');
      }

      const like = await this.prisma.like.create({
        data: {
          postId,
          userId,
        },
      });

      return like;
    } catch (error) {
      console.error('Error in likePost:', error.message);
      if (
        error instanceof NotFoundException ||
        error.message === 'You already liked this post'
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while liking the post',
      );
    }
  }

  async unlikePost(postId: number, userId: number) {
    try {
      const like = await this.prisma.like.findFirst({
        where: {
          postId,
          userId,
        },
      });

      if (!like) {
        console.error('Like not found for postId and userId:', {
          postId,
          userId,
        });
        throw new NotFoundException('Like not found');
      }

      const deletedLike = await this.prisma.like.delete({
        where: {
          id: like.id,
        },
      });

      return deletedLike;
    } catch (error) {
      console.error('Error in unlikePost:', error.message);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while unliking the post',
      );
    }
  }
}
