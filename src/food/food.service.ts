import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodNoteInput, UpdateFoodNoteInput } from './food.model';

@Injectable()
export class FoodNotesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: CreateFoodNoteInput) {
    return this.prisma.foodNote.create({
      data: { ...data, userId },
    });
  }

  async findAll(userId: number) {
    return this.prisma.foodNote.findMany({ where: { userId } });
  }

  async update(id: number, userId: number, data: UpdateFoodNoteInput) {
    return this.prisma.foodNote.update({
      where: { id, userId },
      data,
    });
  }

  async delete(id: number, userId: number) {
    return this.prisma.foodNote.delete({
      where: { id, userId },
    });
  }
}