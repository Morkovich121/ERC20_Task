import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransferEntity } from '../entities/transfer.entity';
import { CreateTransferInput } from '../inputs/create-transfer.input';
import { TransferService } from '../transfer.service';

@Resolver()
export class TransferResolver {
  constructor(private readonly transferService: TransferService) {}

  @Mutation(() => TransferEntity)
  async createTransfer(
    @Args('createTransfer') createTransferInput: CreateTransferInput
  ): Promise<TransferEntity> {
    return await this.transferService.createTransfer(createTransferInput);
  }

  @Query(() => TransferEntity)
  async getOneTransfer(
    @Args('address') address: string
  ): Promise<TransferEntity[]> {
    return await this.transferService.getOneTransfer(address);
  }

  @Query(() => [TransferEntity])
  async getAllTransfers(): Promise<TransferEntity[]> {
    return await this.transferService.getAllTransfers();
  }
}
