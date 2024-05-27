import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'ajay',
      email: 'ajay@gmail.com',
      role: 'INTERN',
    },

    {
      id: 2,
      name: 'akash',
      email: 'akash@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'viral',
      email: 'viral@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'rajnish',
      email: 'rajnish@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'ayush',
      email: 'ayush@gmail.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      //   if (rolesArray.length === 0
      if (!rolesArray.length)
        throw new NotFoundException('User Role Not Found');

      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => {
      return b.id - a.id;
    });

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removeUser;
  }
}
