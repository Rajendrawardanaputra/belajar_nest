import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: PrismaService) {}

  async findAll() {
    return this.dbService.user.findMany();
  }

  async findById(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.dbService.user.findUnique({
      where: { email },
    });
    return user;
  }

  async createData(data: any) {
    return this.dbService.user.create({
      data,
    });
  }

  async updateData(id: number, data: any) {
    await this.findUserById(id);
    return this.dbService.user.update({
      where: { id },
      data,
    });
  }

  async deleteData(id: number) {
    await this.findUserById(id);
    return this.dbService.user.delete({
      where: { id },
    });
  }

  private async findUserById(id: number) {
    return this.dbService.user.findUnique({
      where: { id },
    });
  }
}
