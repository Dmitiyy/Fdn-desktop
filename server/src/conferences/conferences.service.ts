import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { Conference, ConferenceDocument } from './schemas/conference.schema';
import * as moment from 'moment-timezone';
import { CreatePaginationDto } from './dto/create-pagination.dto';
import { GetConferenceDto } from './dto/get-conference.dto';

@Injectable()
export class ConferencesService {
  constructor(
    @InjectModel(Conference.name) private conferenceModel: Model<ConferenceDocument>
  ) { }

  async getAll(data: CreatePaginationDto): Promise<Conference[]> {
    const conferences = await this.conferenceModel.find()
      .limit(+data.limit)
      .skip((+data.page - 1) * +data.limit)
      .sort({ createdAt: 'desc' });

    return this.transformDataWithCertainTime(conferences);
  }

  async createOne(data: CreateConferenceDto): Promise<Conference> {
    const conference = new this.conferenceModel(data);
    return conference.save();
  }

  transformTime(time: string, author: string): string {
    const ourTimezone: string = moment.tz.guess();
    const authorTime = moment.tz(time, author);
    const userTime = authorTime.clone().tz(ourTimezone);
    return userTime.format();
  }

  transformDataWithCertainTime(data: Array<Conference>): Conference[] {
    const transformedConferences: Array<Conference> = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      element.time = this.transformTime(element.time, element.author.timezon);
      transformedConferences.push(element);
    }
    return transformedConferences;
  }

  async getOne(data: GetConferenceDto): Promise<Conference> {
    const conference = await this.conferenceModel.findById(data.id);
    return this.transformDataWithCertainTime([conference])[0];
  }
}