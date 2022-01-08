import { Conference } from "src/conferences/schemas/conference.schema";

export class YourUserDto {
  readonly conference: Conference;
  readonly userId: string;
}