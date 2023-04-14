import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Guest } from 'src/common/decorators/guest.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ChatDto } from './dto/chat.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createDto: CreateUserDto) {
    return this.userService.register(createDto);
  }

  @UseGuards(LocalAuthGuard)
  @Guest()
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('chat')
  async chat(@Body() chatDto: ChatDto, @User() user: UserEntity) {
    return this.userService.chat(user, chatDto);
  }
}
