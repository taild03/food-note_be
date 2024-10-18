// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../user/user.service';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(email: string, password: string): Promise<any> {
//     const user = await this.usersService.findOne(email);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { email: user.email, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   async signup(email: string, password: string) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     return this.usersService.create(email, hashedPassword);
//   }
// }
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto, LoginDto } from './auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(dto: SignupDto): Promise<{ access_token: string }> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async validateUser(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
