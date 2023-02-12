import { Controller, Get } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller('/transfers')
export class TransferController {
  constructor(private transferService: TransferService) {}

  create() {
    return this.transferService.create();
  }

  getAll() {
    return this.transferService.getAll();
  }

  @Get()
  getOne() {
    return this.transferService.getOne();
  }
}
