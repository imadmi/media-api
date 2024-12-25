import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  getJwt(req: any): string {
    const jwt = req.headers.authorization?.split(' ')[1];
    return jwt;
  }

  getUserId = (req: Request): any => {
    try {
      const token = this.getJwt(req);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        return decoded.sub;
      }
      return null;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  };

  async create(data: any, req: Request): Promise<Post> {
    const userId = this.getUserId(req);
    return this.prisma.post.create({
      data: {
        authorId: userId,
        ...data,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        author: true,
        likes: true,
        comments: {
          include: {
            author: {
              select: {
                fullName: true,
                login: true,
                picture: true,
                id : true,
              },
            },
          },
        },
        reposts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
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
