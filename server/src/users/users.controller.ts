import { Body, Controller, Get, Patch } from '@nestjs/common';
import { FavouriteUserDto } from './dto/favourite-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Patch('addToFavourite')
  addToFavourite(@Body() data: FavouriteUserDto) {
    return this.usersService.addToFavourite(data);
  }
}
