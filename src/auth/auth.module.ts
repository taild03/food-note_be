// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { AuthResolver } from './auth.resolver';
// import { JwtStrategy } from './jwt.strategy';
// import { UsersModule } from '../user/user.module';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       secret: '12345', // Use an environment variable in production
//       signOptions: { expiresIn: '1d' },
//     }),
//     UsersModule,
//   ],
//   providers: [AuthService, AuthResolver, JwtStrategy],
//   exports: [AuthService],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use your JWT secret from .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, PrismaService],
})
export class AuthModule {}
