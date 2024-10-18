import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFoodDto {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  address: string;

  @Field()
  image: string;
}
