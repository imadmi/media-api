import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { LikeModule } from './like/like.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [AuthModule, UserModule, PostsModule, LikeModule, CommentsModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
