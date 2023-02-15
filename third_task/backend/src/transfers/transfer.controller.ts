import { Controller, Get, Param, Post } from '@nestjs/common';
import { TransferEntity } from './entities/transfer.entity';
import { CreateTransferInput } from './inputs/create-transfer.input';
import { TransferService } from './transfer.service';

@Controller('/transfers')
export class TransferController {
  constructor(private transferService: TransferService) {}

  @Get()
  getAllTransfers() {
    return this.transferService.getAllTransfers();
  }

  @Get(':id')
  getOneTransfer(@Param('id') id: number) {
    return this.transferService.getOneTransfer(id);
  }

  @Post()
  createTransfer(transferInput: CreateTransferInput): Promise<TransferEntity> {
    return this.transferService.createTransfer(transferInput);
  }
}
