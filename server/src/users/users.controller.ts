import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ConferencesService } from 'src/conferences/conferences.service';
import { FavouriteUserDto, FavouriteUserConfDto } from './dto/favourite-user.dto';
import { RemoveYourDto } from './dto/remove-your.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly conferenceService: ConferencesService
  ) { }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Patch('addToFavourite')
  async addToFavourite(@Body() data: FavouriteUserDto) {
    const conference = await this.conferenceService.getOne({ id: data.conferenceId });
    const result: FavouriteUserConfDto = { conference, ...data };
    return this.usersService.addToFavourite(result);
  }

  @Patch('removeFromFavourite')
  async removeFromFavourite(@Body() data: RemoveYourDto) {
    return this.usersService.removeFromYour(data);
  }
}
