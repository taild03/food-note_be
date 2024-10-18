import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FoodNotesModule } from './food/food.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',  // Specify the output path for the generated schema
      sortSchema: true, // Optionally sort schema for consistency
    }),
    PrismaModule,
    AuthModule,
    FoodNotesModule,
  ],
})
export class AppModule {}
