import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddPaymentMethodInput {
  @Field()
  type: string;

  @Field()
  last4: string;

  @Field({ defaultValue: false })
  isDefault: boolean;
}
