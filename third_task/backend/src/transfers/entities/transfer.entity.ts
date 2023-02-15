import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('transfers')
export class TransferEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  sender: string;

  @Field()
  @Column()
  recipient: string;

  @Field()
  @Column()
  tokenAmount: number;

  @Field()
  @Column()
  hash: string;
}
