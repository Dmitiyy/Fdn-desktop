import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { Conference, ConferenceDocument } from './schemas/conference.schema';
import * as moment from 'moment-timezone';
import { CreatePaginationDto } from './dto/create-pagination.dto';
import { GetConferenceDto } from './dto/get-conference.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ConferencesService {
  constructor(
    @InjectModel(Conference.name) private conferenceModel: Model<ConferenceDocument>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly usersService: UsersService
  ) { }

  async getAll(data: CreatePaginationDto): Promise<Conference[]> {
    const conferences = await this.conferenceModel.find()
      .limit(+data.limit)
      .skip((+data.page - 1) * +data.limit)
      .sort({ createdAt: 'desc' });

    return this.transformDataWithCertainTime(conferences);
  }

  async createOne(data: CreateConferenceDto): Promise<Conference> {
    const uploadedImage = await this.cloudinaryService.uploadImage(data.photo);
    const conference = new this.conferenceModel({
      ...data, createdAt: new Date(), updatedAt: new Date(), photo: uploadedImage.url
    });
    await conference.save();
    await this.usersService.addToYour({ userId: data.userId, conference });
    return conference;
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
    return conference;
  }
}