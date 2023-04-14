import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from './user.entity';

@Entity('chat_messages')
@Index('idx_from_to', ['fromUser', 'toUser'])
@Index('idx_to', ['toUser'])
export class ChatMessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @ManyToOne(() => UserEntity)
  fromUser: UserEntity;

  @Expose()
  @ManyToOne(() => UserEntity)
  toUser: UserEntity;

  @Expose()
  @Column({ comment: 'content', nullable: false })
  content: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;
}
