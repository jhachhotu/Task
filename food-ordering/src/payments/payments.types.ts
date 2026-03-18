import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaymentMethodType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field()
  type: string;

  @Field()
  last4: string;

  @Field()
  isDefault: boolean;
}
