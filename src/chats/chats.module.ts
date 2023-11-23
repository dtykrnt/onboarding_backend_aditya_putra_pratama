import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, ChatSchema } from './schema/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'chats', schema: ChatSchema }])],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
