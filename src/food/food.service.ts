import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  // Get all foods for a specific user
  getAllFoods(userId: number) {
    return this.prisma.food.findMany({
      where: { userId },
    });
  }

  // Get food by its ID for a specific user
  getFoodById(id: number, userId: number) {
    return this.prisma.food.findUnique({
      where: {
        id,
        userId,
      },
    });
  }

  // Create a new food item
  createFood(foodData: Prisma.FoodCreateInput) {
    return this.prisma.food.create({
      data: foodData,
    });
  }

  // Update food item by ID and user
  updateFood(id: number, userId: number, updateData: Prisma.FoodUpdateInput) {
    return this.prisma.food.update({
      where: {
        id,
        userId,
      },
      data: updateData,
    });
  }

  // Delete food item by ID and user
  async deleteFood(id: number, userId: number) {
    await this.prisma.food.delete({
      where: {
        id,
        userId,
      },
    });
    return true; // Return a boolean instead of the deleted object
  }
}
