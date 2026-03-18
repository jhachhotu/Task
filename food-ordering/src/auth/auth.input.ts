import { InputType, Field } from '@nestjs/graphql';
import { Role, Country } from '../common/enums';

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field(() => Role, { defaultValue: Role.MEMBER })
  role: Role;

  @Field(() => Country)
  country: Country;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
