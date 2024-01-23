import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return { success: true, data: users };
    } catch (error) {
      throw new NotFoundException('Error fetching users.');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const user = await this.userService.findById(Number(id));
      return { success: true, data: user };
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }

  @Post()
  async createUser(@Body() body) {
    try {
      if (!body.name || !body.email || !body.password) {
        throw new BadRequestException(
          'Incomplete data. Please provide name, email, and password.',
        );
      }

      if (body.role && !['Admin', 'User'].includes(body.role)) {
        throw new BadRequestException(
          'Invalid role. Allowed roles are Admin and User.',
        );
      }

      const hashedPassword = await bcrypt.hash(body.password, 10);

      const userWithHashedPassword = {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: body.role,
      };

      const createdUser = await this.userService.createData(userWithHashedPassword);
      return { success: true, data: createdUser };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body) {
    try {
      if (!body.name || !body.email) {
        throw new BadRequestException(
          'Incomplete data. Please provide name and email.',
        );
      }

      if (body.role && !['Admin', 'User'].includes(body.role)) {
        throw new BadRequestException(
          'Invalid role. Allowed roles are Admin and User.',
        );
      }

      const hashedPassword = body.password
        ? await bcrypt.hash(body.password, 10)
        : undefined;

      const updatedUserData = {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: body.role,
      };

      const updatedUser = await this.userService.updateData(Number(id), updatedUserData);
      return { success: true, data: updatedUser };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const deletedUser = await this.userService.deleteData(Number(id));

      if (!deletedUser) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }

      return { success: true, data: deletedUser };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
