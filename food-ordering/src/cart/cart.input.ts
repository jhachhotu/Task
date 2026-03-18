import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddToCartInput {
  @Field(() => Int)
  menuItemId: number;

  @Field(() => Int, { defaultValue: 1 })
  quantity: number;
}
