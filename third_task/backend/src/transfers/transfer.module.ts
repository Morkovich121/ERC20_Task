import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferEntity } from './entities/transfer.entity';
import { TransferResolver } from './resolvers/user.resolver';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransferEntity])],
  controllers: [TransferController],
  providers: [TransferService, TransferResolver],
})
export class TransferModule {}
