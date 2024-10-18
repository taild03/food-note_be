// import { Resolver, Mutation, Args } from '@nestjs/graphql';
// import { AuthService } from './auth.service';

// @Resolver('Auth')
// export class AuthResolver {
//   constructor(private authService: AuthService) {}

//   @Mutation(() => String)
//   async login(
//     @Args('email') email: string,
//     @Args('password') password: string,
//   ) {
//     const user = await this.authService.validateUser(email, password);
//     if (!user) {
//       throw new Error('Invalid credentials');
//     }
//     return this.authService.login(user);
//   }

//   @Mutation(() => String)
//   async signup(
//     @Args('email') email: string,
//     @Args('password') password: string,
//   ) {
//     return this.authService.signup(email, password);
//   }
// }
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async signup(@Args('data') data: SignupDto): Promise<string> {
    const result = await this.authService.signup(data);
    return result.access_token;
  }

  @Mutation(() => String)
  async login(@Args('data') data: LoginDto): Promise<string> {
    const result = await this.authService.login(data);
    return result.access_token;
  }
}
