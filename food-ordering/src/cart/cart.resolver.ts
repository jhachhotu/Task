import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemType } from './cart.types';
import { AddToCartInput } from './cart.input';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';

@Resolver()
@UseGuards(JwtAuthGuard)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => [CartItemType])
  myCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user.id);
  }

  @Mutation(() => CartItemType)
  addToCart(@CurrentUser() user: any, @Args('input') input: AddToCartInput) {
    return this.cartService.addToCart(user.id, input);
  }

  @Mutation(() => CartItemType)
  removeFromCart(
    @CurrentUser() user: any,
    @Args('cartItemId', { type: () => Int }) cartItemId: number,
  ) {
    return this.cartService.removeFromCart(user.id, cartItemId);
  }

  @Mutation(() => Boolean)
  clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.id);
  }
}
