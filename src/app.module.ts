import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthModule, UserModule, PostsModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}