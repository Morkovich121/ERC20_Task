import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get(':address')
  getOneTransfer(@Param('address') address: string): Promise<TransferEntity[]> {
    return this.transferService.getOneTransfer(address);
  }

  @Post()
  createTransfer(
    @Body() transferInput: CreateTransferInput
  ): Promise<TransferEntity> {
    return this.transferService.createTransfer(transferInput);
  }
}
