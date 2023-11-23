import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Chat {
  @Prop()
  message: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
