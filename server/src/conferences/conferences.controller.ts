import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConferencesService } from './conferences.service';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { CreatePaginationDto } from './dto/create-pagination.dto';
import { GetConferenceDto } from './dto/get-conference.dto';

@Controller('conferences')
export class ConferencesController {
  constructor(private readonly conferencesService: ConferencesService) { }

  @Post('getAll')
  getAllConferences(@Body() data: CreatePaginationDto) {
    return this.conferencesService.getAll(data);
  }

  @Post('create')
  createConference(@Body() data: CreateConferenceDto) {
    return this.conferencesService.createOne(data);
  }

  @Post('getOne')
  getOneConference(@Body() data: GetConferenceDto) {
    return this.conferencesService.getOne(data);
  }
}
