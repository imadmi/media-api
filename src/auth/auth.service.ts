import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid email or password');
  }
  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return {
      ...user,
      token,
    };
  }
  async register(email: string, fullName: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException(
        { success: false, message: 'User already exists, try sign in' },
        HttpStatus.CONFLICT,
      );
    }

    const newUser = await this.userService.createUser(
      email,
      fullName,
      password,
    );
    if (!newUser) {
      throw new HttpException(
        { success: false, message: 'Failed to create user' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const userWithAccessToken = await this.login(newUser);
      return { success: true, userWithAccessToken };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async oauth2(email: string, fullName: string, picture: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      const userWithAccessToken = await this.login(existingUser);
      return { success: true, userWithAccessToken };
    }

    const newUser = await this.userService.createUser(email, fullName, picture);
    if (!newUser) {
      throw new HttpException(
        { success: false, message: 'Failed to create user' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const userWithAccessToken = await this.login(newUser);
      return { success: true, userWithAccessToken };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
