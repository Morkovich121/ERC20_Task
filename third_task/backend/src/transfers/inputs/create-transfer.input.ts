import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTransferInput {
  @Field()
  sender: string;

  @Field()
  recipient: string;

  @Field()
  tokenAmount: number;

  @Field()
  hash: string;
}
