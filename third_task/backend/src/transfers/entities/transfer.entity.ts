import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('transfers')
export class TransferEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 42, nullable: false })
  sender: string;

  @Field()
  @Column({ type: 'varchar', length: 42, nullable: false })
  recipient: string;

  @Field()
  @Column()
  tokenAmount: number;

  @Field()
  @Column({ type: 'text', nullable: false })
  hash: string;
}
