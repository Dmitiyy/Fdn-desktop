import { Conference } from "src/conferences/schemas/conference.schema";

export class FavouriteUserDto {
  readonly userId: string;
  readonly conferenceId: string;
}

export class FavouriteUserConfDto extends FavouriteUserDto {
  readonly conference: Conference;
}