import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from '../users/users.types';

export { UserType };

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;

  @Field(() => UserType)
  user: UserType;
}
