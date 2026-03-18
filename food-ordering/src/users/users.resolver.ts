import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from './users.types';
import { UpdateUserInput } from './users.input';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { CurrentUser } from '../common/current-user.decorator';
import { Role } from '../common/enums';

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserType)
  me(@CurrentUser() user: any) {
    return this.usersService.getProfile(user.id);
  }

  @Query(() => [UserType])
  @Roles(Role.ADMIN)
  users() {
    return this.usersService.getAllUsers();
  }

  @Mutation(() => UserType)
  updateUser(
    @CurrentUser() user: any,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.usersService.updateProfile(user, id, input);
  }
}
