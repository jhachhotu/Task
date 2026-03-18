import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserInput } from './users.input';
import { Role } from '../common/enums';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(currentUser: any, targetId: number, input: UpdateUserInput) {
    if (currentUser.role !== Role.ADMIN && currentUser.id !== targetId) {
      throw new ForbiddenException('Cannot update another user\'s profile');
    }
    return this.prisma.user.update({ where: { id: targetId }, data: input });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
