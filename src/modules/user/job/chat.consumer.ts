import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { UserEntity } from '../entities/user.entity';
import { isNil } from 'lodash';
import { ChatMessageEntity } from '../entities/chat.message.entity';

@Processor('chat')
@Injectable()
export class ChatConsumer {
  @Process()
  async test(job: Job<any>) {
    await ChatMessageEntity.createQueryBuilder(ChatMessageEntity.name)
      .insert()
      .updateEntity(false)
      .values({
        fromUser: await UserEntity.findOneBy({ id: job.data.fromUser }),
        toUser: await UserEntity.findOneBy({ id: job.data.toUser }),
        content: job.data.content,
      })
      .execute();
  }
}
