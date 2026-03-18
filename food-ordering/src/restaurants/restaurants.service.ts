import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantInput, CreateMenuItemInput, UpdateMenuItemInput } from './restaurants.input';
import { Country } from '../common/enums';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  getAll(country?: Country) {
    return this.prisma.restaurant.findMany({
      where: country ? { country } : undefined,
      include: { menuItems: true },
    });
  }

  async getOne(id: number) {
    const r = await this.prisma.restaurant.findUnique({ where: { id }, include: { menuItems: true } });
    if (!r) throw new NotFoundException('Restaurant not found');
    return r;
  }

  create(input: CreateRestaurantInput) {
    return this.prisma.restaurant.create({ data: input, include: { menuItems: true } });
  }

  async delete(id: number) {
    await this.getOne(id);
    return this.prisma.restaurant.delete({ where: { id }, include: { menuItems: true } });
  }

  createMenuItem(input: CreateMenuItemInput) {
    return this.prisma.menuItem.create({ data: input });
  }

  async updateMenuItem(id: number, input: UpdateMenuItemInput) {
    const item = await this.prisma.menuItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Menu item not found');
    return this.prisma.menuItem.update({ where: { id }, data: input });
  }

  async deleteMenuItem(id: number) {
    const item = await this.prisma.menuItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Menu item not found');
    return this.prisma.menuItem.delete({ where: { id } });
  }
}
