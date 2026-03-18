import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantType, MenuItemType } from './restaurants.types';
import { CreateRestaurantInput, CreateMenuItemInput, UpdateMenuItemInput } from './restaurants.input';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role, Country } from '../common/enums';

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
export class RestaurantsResolver {
  constructor(private restaurantsService: RestaurantsService) {}

  @Query(() => [RestaurantType])
  restaurants(@Args('country', { type: () => Country, nullable: true }) country?: Country) {
    return this.restaurantsService.getAll(country);
  }

  @Query(() => RestaurantType)
  restaurant(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantsService.getOne(id);
  }

  @Mutation(() => RestaurantType)
  @Roles(Role.ADMIN, Role.MANAGER)
  createRestaurant(@Args('input') input: CreateRestaurantInput) {
    return this.restaurantsService.create(input);
  }

  @Mutation(() => RestaurantType)
  @Roles(Role.ADMIN)
  deleteRestaurant(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantsService.delete(id);
  }

  @Mutation(() => MenuItemType)
  @Roles(Role.ADMIN, Role.MANAGER)
  createMenuItem(@Args('input') input: CreateMenuItemInput) {
    return this.restaurantsService.createMenuItem(input);
  }

  @Mutation(() => MenuItemType)
  @Roles(Role.ADMIN, Role.MANAGER)
  updateMenuItem(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateMenuItemInput,
  ) {
    return this.restaurantsService.updateMenuItem(id, input);
  }

  @Mutation(() => MenuItemType)
  @Roles(Role.ADMIN, Role.MANAGER)
  deleteMenuItem(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantsService.deleteMenuItem(id);
  }
}
