import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';

@Module({
  imports: [PrismaModule],
  providers: [FoodService, FoodResolver, PrismaService],
})
export class FoodNotesModule {}