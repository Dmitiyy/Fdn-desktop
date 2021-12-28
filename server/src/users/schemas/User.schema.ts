import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Conference } from "../../conferences/schemas/conference.schema";

@Schema()
export class User {
  @Prop({ required: true })
  name: string

  @Prop()
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
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;