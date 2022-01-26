import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conference, ConferenceDocument } from 'src/conferences/schemas/conference.schema';
import { Message } from 'src/messages/schemas/message.schema';
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

  async addMessageUser(id: string, message: Message): Promise<User> {
    const user = await this.userModel.findById(id);
    await user.updateOne({ supportMessages: [...user.supportMessages, message] });
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
      if (!data.delete) {
        await user.updateOne({ conferences: [...user.conferences, data.conference] });
      } else {
        const filteredConfs = user.conferences.filter((item: any) => {
          const conf: any = data.conference;
          return item._id.toString() !== conf._id.toString();
        });
        await user.updateOne({ conferences: filteredConfs });
      }
    }
    return user;
  }

  async removeFromYour(data: RemoveYourDto): Promise<User> {
    const conferences = (await this.userModel.findById(data.userId)).conferences;
    const findConference = (isEqual: Boolean): Conference[] => {
      return conferences.filter((item: any) => {
        const itemId: string = item._id.toString();
        if (isEqual) return itemId === data.conferenceId
        else return itemId !== data.conferenceId
      });
    };
    const filteredConfs = findConference(false);
    const user = await this.userModel.findById(data.userId);
    if (user.email === findConference(true)[0].author.email) {
      await this.conferenceModel.findByIdAndDelete(data.conferenceId);
    } else {
      await this.conferenceModel.findByIdAndUpdate(
        data.conferenceId, { participants: (+(findConference(true)[0].participants) - 1).toString() }
      );
    }
    const changedUser = await user.updateOne({ conferences: filteredConfs });
    return changedUser;
  }
}
