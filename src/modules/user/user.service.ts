import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { isNil } from 'lodash';
import { ChatDto } from './dto/chat.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { WsService } from '../ws/ws.service';

@Injectable()
export class UserService {
  constructor(
    @InjectQueue('chat') private queue: Queue,
    private readonly wsService: WsService,
  ) {}

  async findByName(username: string) {
    return await UserEntity.findBy({ username: username });
  }

  async register(createDto: CreateUserDto): Promise<UserEntity> {
    const user = await UserEntity.findOneBy({ username: createDto.username });
    if (user) {
      throw new BadRequestException('username exists!');
    }
    const new_user = new UserEntity();
    new_user.username = createDto.username;
    new_user.password = await bcrypt.hashSync(createDto.password as string, 10);
    await new_user.save();
    return new_user;
  }

  async login(loginDto: LoginDto) {
    const user = await UserEntity.findOneBy({ username: loginDto.username });
    return !isNil(user) &&
      (await bcrypt.compare(loginDto.password, user.password))
      ? user
      : null;
  }

  async chat(from: UserEntity, chatDto: ChatDto) {
    console.log(chatDto);
    this.queue.add({
      fromUser: from.id,
      toUser: chatDto.toUser,
      content: chatDto.content,
    });

    this.wsService.pushMessageToUser(chatDto.toUser, 'chat', {
      fromUser: from.id,
      content: chatDto.content,
    });
  }
}
