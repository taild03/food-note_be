import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';

@ObjectType()
export class FoodNote {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  address: string;

  @Field({ nullable: true })
  picture?: string;

  @Field(() => Int)
  userId: number;
}

@InputType()
export class CreateFoodNoteInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  address: string;

  @Field({ nullable: true })
  picture?: string;
}

@InputType()
export class UpdateFoodNoteInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  picture?: string;
}