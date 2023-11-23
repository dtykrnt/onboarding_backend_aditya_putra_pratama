import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schema/chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel('chats')
    private readonly chatModel: Model<Chat>,
  ) {}
  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  async createOne(createChatDto: CreateChatDto) {
    const createChat = new this.chatModel(createChatDto);
    const res = await createChat.save();
    console.log('res', res);
    return res;
    // return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
