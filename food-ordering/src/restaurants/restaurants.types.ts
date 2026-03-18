import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Country } from '../common/enums';

@ObjectType()
export class MenuItemType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  restaurantId: number;
}

@ObjectType()
export class RestaurantType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Country)
  country: Country;

  @Field(() => [MenuItemType])
  menuItems: MenuItemType[];
}
