import { InputType, Field, Int } from '@nestjs/graphql';
import { OrderStatus } from '../common/enums';

@InputType()
export class PlaceOrderInput {
  @Field(() => Int)
  restaurantId: number;

  @Field(() => Int, { nullable: true })
  paymentMethodId?: number;
}

@InputType()
export class UpdateOrderStatusInput {
  @Field(() => OrderStatus)
  status: OrderStatus;
}
