import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferEntity } from './entities/transfer.entity';
import { TransferResolver } from './resolvers/user.resolver';
import { TransferService } from './transfer.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransferEntity])],
  providers: [TransferService, TransferResolver],
})
export class TransferModule {}
