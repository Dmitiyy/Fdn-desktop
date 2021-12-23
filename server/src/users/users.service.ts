import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

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
}
