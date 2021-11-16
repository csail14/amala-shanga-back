import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { Users } from './interfaces/users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async showAll() {
    return await this.users.find();
  }

  findOne(id: string): Promise<User> {
    return this.users.findOne(id);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.isPaid = createUserDto.isPaid;

    return this.users.save(user);
  }

  // update(id: string, user: CreateUserDto) {
  //   const userToUpdate = this.users.find((item) => item.id === +id);
  //   if (!userToUpdate) {
  //     return new NotFoundException("This user doesn't exist");
  //   }
  //   if (user.hasOwnProperty('isPaid')) {
  //     userToUpdate.isPaid = user.isPaid;
  //   }
  //   if (user.email) {
  //     userToUpdate.email = user.email;
  //   }
  //   if (user.name) {
  //     userToUpdate.name = user.name;
  //   }
  //   const updatedUser = this.users.map((item) =>
  //     item.id !== +id ? item : userToUpdate,
  //   );
  //   this.users = updatedUser;
  //   return { updatedusers: 1, users: userToUpdate };
  // }

  async remove(id: string): Promise<void> {
    await this.users.delete(id);
  }
}
