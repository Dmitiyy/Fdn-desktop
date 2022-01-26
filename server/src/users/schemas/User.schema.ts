import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Message } from "src/messages/schemas/message.schema";
import { Conference } from "../../conferences/schemas/conference.schema";

@Schema()
export class User {
  @Prop({ required: true })
  name: string

  @Prop({ default: '' })
  photo: string

  @Prop({ default: 'Please establish your job' })
  job: string

  @Prop({ required: true, min: 8, select: true })
  password: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ default: [] })
  conferences: Array<Conference>

  @Prop({ default: [] })
  likedConferences: Array<Conference>

  @Prop({ default: Date.now() })
  createdAt: Date

  @Prop({ default: Date.now() })
  updatedAt: Date

  @Prop({ default: [] })
  supportMessages: Array<Message>
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;