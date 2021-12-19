import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CreateAuthorDto } from "../dto/create-author.dto";

@Schema()
export class Conference {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  date: string

  @Prop({ required: true })
  time: string

  @Prop({ required: true })
  photo: string

  @Prop()
  author: CreateAuthorDto
}

export const ConferenceSchema = SchemaFactory.createForClass(Conference);
export type ConferenceDocument = Conference & Document;