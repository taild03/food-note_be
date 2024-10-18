import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupDto {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
