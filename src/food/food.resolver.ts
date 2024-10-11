import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FoodNotesService } from './food.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FoodNote, CreateFoodNoteInput, UpdateFoodNoteInput } from './food.model';

@Resolver(() => FoodNote)
@UseGuards(JwtAuthGuard)
export class FoodNotesResolver {
  constructor(private foodNotesService: FoodNotesService) {}

  @Query(() => [FoodNote])
  async foodNotes(@Context() context) {
    return this.foodNotesService.findAll(context.req.user.userId);
  }

  @Mutation(() => FoodNote)
  async createFoodNote(
    @Args('input') createFoodNoteInput: CreateFoodNoteInput,
    @Context() context
  ) {
    return this.foodNotesService.create(context.req.user.userId, createFoodNoteInput);
  }

  @Mutation(() => FoodNote)
  async updateFoodNote(
    @Args('id') id: number,
    @Args('input') updateFoodNoteInput: UpdateFoodNoteInput,
    @Context() context
  ) {
    return this.foodNotesService.update(id, context.req.user.userId, updateFoodNoteInput);
  }

  @Mutation(() => Boolean)
  async deleteFoodNote(@Args('id') id: number, @Context() context) {
    await this.foodNotesService.delete(id, context.req.user.userId);
    return true;
  }
}