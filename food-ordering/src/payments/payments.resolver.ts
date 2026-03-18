import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentMethodType } from './payments.types';
import { AddPaymentMethodInput } from './payments.input';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';

@Resolver()
@UseGuards(JwtAuthGuard)
export class PaymentsResolver {
  constructor(private paymentsService: PaymentsService) {}

  @Query(() => [PaymentMethodType])
  myPaymentMethods(@CurrentUser() user: any) {
    return this.paymentsService.getMyPaymentMethods(user.id);
  }

  @Mutation(() => PaymentMethodType)
  addPaymentMethod(@CurrentUser() user: any, @Args('input') input: AddPaymentMethodInput) {
    return this.paymentsService.addPaymentMethod(user.id, input);
  }

  @Mutation(() => PaymentMethodType)
  removePaymentMethod(
    @CurrentUser() user: any,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.paymentsService.removePaymentMethod(user.id, id);
  }

  @Mutation(() => PaymentMethodType)
  setDefaultPaymentMethod(
    @CurrentUser() user: any,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.paymentsService.setDefault(user.id, id);
  }
}
