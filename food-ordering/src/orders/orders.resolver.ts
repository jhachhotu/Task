import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderType } from './orders.types';
import { PlaceOrderInput, UpdateOrderStatusInput } from './orders.input';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { CurrentUser } from '../common/current-user.decorator';
import { Role } from '../common/enums';

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersResolver {
  constructor(private ordersService: OrdersService) {}

  @Mutation(() => OrderType)
  placeOrder(@CurrentUser() user: any, @Args('input') input: PlaceOrderInput) {
    return this.ordersService.placeOrder(user.id, input);
  }

  @Query(() => [OrderType])
  myOrders(@CurrentUser() user: any) {
    return this.ordersService.getMyOrders(user.id);
  }

  @Query(() => [OrderType])
  @Roles(Role.ADMIN, Role.MANAGER)
  allOrders() {
    return this.ordersService.getAllOrders();
  }

  @Query(() => OrderType)
  order(@CurrentUser() user: any, @Args('id', { type: () => Int }) id: number) {
    return this.ordersService.getOrder(id, user);
  }

  @Mutation(() => OrderType)
  @Roles(Role.ADMIN, Role.MANAGER)
  updateOrderStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateOrderStatusInput,
  ) {
    return this.ordersService.updateStatus(id, input);
  }
}
