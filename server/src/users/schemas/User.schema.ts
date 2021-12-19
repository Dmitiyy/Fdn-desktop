import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User {
  @Prop({ required: true })
  name: string

  @Prop()
  photo: string

  @Prop({ default: 'Please establish your job' })
  job: string

  @Prop({ required: true, min: 8, select: false })
  password: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ default: [] })
  conferences: Array<any>
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;