import { Controller, Post, Body, Session } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string, @Session() session: Record<string, any>) {
    const user = await this.authService.validateUser(email, password);
    if (user) {
      const loggedInUser = await this.authService.login(user);
      session.user = loggedInUser;
      session.roleUser = loggedInUser.roleUser;
      session.userId = loggedInUser.userId;
      //console.log('Session User:', loggedInUser);
      //console.log('Session Role User:', loggedInUser.roleUser);
      //console.log('Session User ID:', loggedInUser.userId);
      return { message: 'Login successful', user: loggedInUser };
    }
    return { message: 'Invalid credentials' };
  }
}
