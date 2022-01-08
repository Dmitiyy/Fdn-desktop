import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CreateAuthorDto } from "../dto/create-author.dto";

@Schema()
export class Conference {
  @Prop({ required: true })
  name: string

  @Prop()
  date: string

  @Prop({ required: true })
  time: string

  @Prop({ required: true })
  photo: string

  @Prop({ required: true })
  author: CreateAuthorDto

  @Prop({ required: true })
  description: string

  @Prop({ default: '' })
  conferenceLink: string

  @Prop({ default: '0' })
  participants: string

  @Prop({ default: Date.now() })
  createdAt: Date

  @Prop({ default: Date.now() })
  updatedAt: Date
}

export const ConferenceSchema = SchemaFactory.createForClass(Conference);
export type ConferenceDocument = Conference & Document;