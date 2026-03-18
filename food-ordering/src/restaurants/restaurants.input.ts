import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { Country } from '../common/enums';

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field(() => Country)
  country: Country;
}

@InputType()
export class CreateMenuItemInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  restaurantId: number;
}

@InputType()
export class UpdateMenuItemInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  description?: string;
}
