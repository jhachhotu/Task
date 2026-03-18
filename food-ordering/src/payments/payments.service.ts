import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddPaymentMethodInput } from './payments.input';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async getMyPaymentMethods(userId: number) {
    return this.prisma.paymentMethod.findMany({ where: { userId } });
  }

  async addPaymentMethod(userId: number, input: AddPaymentMethodInput) {
    if (input.isDefault) {
      await this.prisma.paymentMethod.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    return this.prisma.paymentMethod.create({ data: { ...input, userId } });
  }

  async removePaymentMethod(userId: number, id: number) {
    const pm = await this.prisma.paymentMethod.findUnique({ where: { id } });
    if (!pm) throw new NotFoundException('Payment method not found');
    if (pm.userId !== userId) throw new ForbiddenException('Not your payment method');
    return this.prisma.paymentMethod.delete({ where: { id } });
  }

  async setDefault(userId: number, id: number) {
    const pm = await this.prisma.paymentMethod.findUnique({ where: { id } });
    if (!pm) throw new NotFoundException('Payment method not found');
    if (pm.userId !== userId) throw new ForbiddenException('Not your payment method');
    await this.prisma.paymentMethod.updateMany({ where: { userId }, data: { isDefault: false } });
    return this.prisma.paymentMethod.update({ where: { id }, data: { isDefault: true } });
  }
}
