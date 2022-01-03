import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conference, ConferenceDocument } from 'src/conferences/schemas/conference.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { FavouriteUserDto } from './dto/favourite-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Conference.name) private conferenceModel: Model<ConferenceDocument>,
  ) { }

  async findOneUser(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({ ...data });
    return newUser.save();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async addToFavourite(data: FavouriteUserDto): Promise<User> {
    const user = await this.userModel.findById(data.userId);
    if (user) {
      const conference = await this.conferenceModel.findById(data.conferenceId);
      if (conference) {
        const isExist = user.likedConferences.some((item: any) => {
          return item._id.toString() === data.conferenceId;
        });
        let ourlikedConferences = [];
        if (!isExist) {
          ourlikedConferences = [...user.likedConferences, conference];
        } else {
          ourlikedConferences = user.likedConferences.filter((item: any) => {
            return item._id.toString() !== data.conferenceId;
          });
        }
        await user.updateOne({ likedConferences: ourlikedConferences });
      }
    }
    return user;
  }
}
