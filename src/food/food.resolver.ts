import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { FoodService } from './food.service';
import { Food } from '../models/food.model';

@Resolver(() => Food)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  // Get all foods for a specific user
  @Query(() => [Food])
  getAllFoods(@Args('userId') userId: number) {
    return this.foodService.getAllFoods(userId);
  }

  // Get food by its ID
  @Query(() => Food, { nullable: true })
  getFoodById(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.foodService.getFoodById(id, userId);
  }

  // Create a new food entry
  @Mutation(() => Food)
  createFood(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('address') address: string,
    @Args('userId') userId: number,
    @Args('image') image: string,
  ) {
    return this.foodService.createFood({
      name,
      price,
      address,
      image,
      user: {
        connect: { id: userId }, // Connect the food with the user via userId
      },
    });
  }

  // Update an existing food entry
  @Mutation(() => Food)
  updateFood(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('name', { type: () => String, nullable: true }) name?: string,
    @Args('price', { type: () => Float, nullable: true }) price?: number,
    @Args('address', { type: () => String, nullable: true }) address?: string,
    @Args('image', { type: () => String, nullable: true }) image?: string,
  ) {
    return this.foodService.updateFood(id, userId, {
      name,
      price,
      address,
      image,
    });
  }

  // Delete a food entry
  @Mutation(() => Boolean)
  deleteFood(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.foodService.deleteFood(id, userId);
  }
}
