import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Food {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  address: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => Int)
  userId: number;
}
