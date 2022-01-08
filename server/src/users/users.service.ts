import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FavouriteUserConfDto } from './dto/favourite-user.dto';
import { YourUserDto } from './dto/your-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
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
}
