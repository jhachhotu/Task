import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role, Country } from '../common/enums';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => Role)
  role: Role;

  @Field(() => Country)
  country: Country;
}
