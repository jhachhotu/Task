import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { OrderStatus } from '../common/enums';

@ObjectType()
export class OrderItemType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  menuItemId: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}

@ObjectType()
export class OrderType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  restaurantId: number;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => Float)
  totalAmount: number;

  @Field(() => [OrderItemType])
  items: OrderItemType[];

  @Field(() => Int, { nullable: true })
  paymentMethodId?: number;

  @Field()
  createdAt: Date;
}
