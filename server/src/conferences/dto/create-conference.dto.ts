import { CreateAuthDto } from "src/auth/create-auth.dto";

export class CreateConferenceDto {
  readonly name: string;
  readonly date: string;
  readonly time: string;
  readonly photo: string;
  readonly author: CreateAuthDto;
  readonly description: string;
  readonly conferenceLink: string;
}