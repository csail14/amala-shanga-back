import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './interfaces/users.interface';
import { CreateUserDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async showAllUsers() {
    const users = await this.usersService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string) {
    const data = await this.usersService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    this.usersService.create(newUser);
  }

  // @Patch(':id')
  // updateUser(@Param('id') id: string, @Body() user: CreateUserDto) {
  //   return this.usersService.update(id, user);
  // }
  // @Delete(':id')
  // deleteUser(@Param('id') id: string) {
  //   return this.usersService.delete(id);
  // }
}
