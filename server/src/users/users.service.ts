import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conference, ConferenceDocument } from 'src/conferences/schemas/conference.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { FavouriteUserConfDto } from './dto/favourite-user.dto';
import { RemoveYourDto } from './dto/remove-your.dto';
import { YourUserDto } from './dto/your-user.dto';
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

  async addToFavourite(data: FavouriteUserConfDto): Promise<User> {
    const user = await this.userModel.findById(data.userId);
    if (user) {
      if (data.conference) {
        const isExist = user.likedConferences.some((item: any) => {
          return item._id.toString() === data.conferenceId;
        });
        let ourlikedConferences = [];
        if (!isExist) {
          ourlikedConferences = [...user.likedConferences, data.conference];
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

  async addToYour(data: YourUserDto): Promise<User> {
    const user = await this.userModel.findById(data.userId);
    if (user && data.conference) {
      await user.updateOne({ conferences: [...user.conferences, data.conference] });
    }
    return user;
  }

  async removeFromYour(data: RemoveYourDto): Promise<User> {
    const conferences = (await this.userModel.findById(data.userId)).conferences;
    const filteredConfs = conferences.filter((item: any) => {
      return item._id.toString() !== data.conferenceId;
    });
    const changedUser = await this.userModel.findByIdAndUpdate(
      data.userId, { conferences: filteredConfs }
    );
    await this.conferenceModel.findByIdAndDelete(data.conferenceId);
    return changedUser;
  }
}
