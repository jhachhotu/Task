import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartInput } from './cart.input';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { menuItem: true },
    });
    return items.map((i) => ({
      id: i.id,
      userId: i.userId,
      menuItemId: i.menuItemId,
      quantity: i.quantity,
      price: i.menuItem.price,
      menuItemName: i.menuItem.name,
    }));
  }

  async addToCart(userId: number, input: AddToCartInput) {
    const menuItem = await this.prisma.menuItem.findUnique({ where: { id: input.menuItemId } });
    if (!menuItem) throw new NotFoundException('Menu item not found');

    const existing = await this.prisma.cartItem.findFirst({
      where: { userId, menuItemId: input.menuItemId },
    });

    if (existing) {
      const updated = await this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + input.quantity },
        include: { menuItem: true },
      });
      return { id: updated.id, userId: updated.userId, menuItemId: updated.menuItemId, quantity: updated.quantity, price: updated.menuItem.price, menuItemName: updated.menuItem.name };
    }

    const item = await this.prisma.cartItem.create({
      data: { userId, menuItemId: input.menuItemId, quantity: input.quantity },
      include: { menuItem: true },
    });
    return { id: item.id, userId: item.userId, menuItemId: item.menuItemId, quantity: item.quantity, price: item.menuItem.price, menuItemName: item.menuItem.name };
  }

  async removeFromCart(userId: number, cartItemId: number) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!item) throw new NotFoundException('Cart item not found');
    if (item.userId !== userId) throw new ForbiddenException('Not your cart item');
    const deleted = await this.prisma.cartItem.delete({ where: { id: cartItemId }, include: { menuItem: true } });
    return { id: deleted.id, userId: deleted.userId, menuItemId: deleted.menuItemId, quantity: deleted.quantity, price: (deleted as any).menuItem.price, menuItemName: (deleted as any).menuItem.name };
  }

  async clearCart(userId: number) {
    await this.prisma.cartItem.deleteMany({ where: { userId } });
    return true;
  }
}
