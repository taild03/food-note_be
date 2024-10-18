import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateFoodDto } from './create-food.dto';

@InputType()
export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  image?: string;
}
