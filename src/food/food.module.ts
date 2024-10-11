import { Module } from '@nestjs/common';
import { FoodNotesService } from './food.service';
import { FoodNotesResolver } from './food.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FoodNotesService, FoodNotesResolver],
})
export class FoodNotesModule {}