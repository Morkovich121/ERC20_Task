import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferEntity } from './entities/transfer.entity';
import { CreateTransferInput } from './inputs/create-transfer.input';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(TransferEntity)
    private readonly transferRepository: Repository<TransferEntity>
  ) {}

  async createTransfer(
    transferInput: CreateTransferInput
  ): Promise<TransferEntity> {
    return await this.transferRepository.save({ ...transferInput });
  }

  async getAllTransfers(): Promise<TransferEntity[]> {
    return await this.transferRepository.find();
  }

  async getOneTransfer(address: string): Promise<TransferEntity[]> {
    return await this.transferRepository.find({
      where: [{ sender: address }, { recipient: address }],
    });
  }
}
