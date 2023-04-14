import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChatDto {
  @IsNotEmpty()
  @IsNumber()
  readonly toUser: number;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
