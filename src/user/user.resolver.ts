import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async me(@Context() context) {
    const user = await this.usersService.findOne(context.req.user.email);
    return user.email;
  }
}