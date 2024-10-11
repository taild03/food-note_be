import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(email: string, password: string) {
    return this.prisma.user.create({
      data: { email, password },
    });
  }
}