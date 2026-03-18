import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlaceOrderInput, UpdateOrderStatusInput } from './orders.input';
import { Role } from '../common/enums';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async placeOrder(userId: number, input: PlaceOrderInput) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { menuItem: true },
    });
    if (!cartItems.length) throw new BadRequestException('Cart is empty');

    // Validate all items belong to the given restaurant
    const wrongItems = cartItems.filter((i) => i.menuItem.restaurantId !== input.restaurantId);
    if (wrongItems.length) throw new BadRequestException('All cart items must belong to the selected restaurant');

    const totalAmount = cartItems.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);

    const order = await this.prisma.order.create({
      data: {
        userId,
        restaurantId: input.restaurantId,
        totalAmount,
        paymentMethodId: input.paymentMethodId,
        items: {
          create: cartItems.map((i) => ({
            menuItemId: i.menuItemId,
            quantity: i.quantity,
            price: i.menuItem.price,
          })),
        },
      },
      include: { items: true },
    });

    await this.prisma.cartItem.deleteMany({ where: { userId } });
    return order;
  }

  async getMyOrders(userId: number) {
    return this.prisma.order.findMany({ where: { userId }, include: { items: true } });
  }

  async getAllOrders() {
    return this.prisma.order.findMany({ include: { items: true } });
  }

  async getOrder(id: number, user: any) {
    const order = await this.prisma.order.findUnique({ where: { id }, include: { items: true } });
    if (!order) throw new NotFoundException('Order not found');
    if (user.role === Role.MEMBER && order.userId !== user.id) throw new ForbiddenException('Not your order');
    return order;
  }

  async updateStatus(id: number, input: UpdateOrderStatusInput) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return this.prisma.order.update({ where: { id }, data: { status: input.status }, include: { items: true } });
  }
}
