import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(email: string, fullName: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        fullName,
        login: this.createLoginFromEmail(email),
        email,
        password: hashedPassword,
      },
    });
  }

  createLoginFromEmail(email: string): string {
    return email.split('@')[0].replace(/\./g, '');
  }
}
