import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(userId: number, postId: number, content: string) {
    console.log("🚀 ~ CommentsService ~ createComment ~ userId: number, postId: number, content: string:", userId, postId, content)
    return this.prisma.comment.create({
      data: {
        content,
        author: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    });
  }

  async updateComment(id: number, content: string) {
    return this.prisma.comment.update({
      where: { id },
      data: { content },
    });
  }

  async deleteComment(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
