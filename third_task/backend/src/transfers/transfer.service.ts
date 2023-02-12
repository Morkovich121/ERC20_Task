import { Injectable } from '@nestjs/common';

@Injectable()
export class TransferService {
  async create() {
    return 'Hello World';
  }

  async getAll() {
    return 'Hello Worldd';
  }

  async getOne() {
    return 'Hello Worlddd';
  }
}
