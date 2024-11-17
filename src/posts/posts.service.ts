import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
