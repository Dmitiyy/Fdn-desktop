import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Message {
  @Prop({ required: true })
  text: string

  @Prop({ default: Date.now() })
  createdAt: Date

  @Prop({ required: true })
  authorId: string
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export type MessageDocument = Message & Document;