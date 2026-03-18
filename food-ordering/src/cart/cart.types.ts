import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class CartItemType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  menuItemId: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  menuItemName?: string;
}
