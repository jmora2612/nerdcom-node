import { Module } from '@nestjs/common';
import { TransactionTypeService } from './service/transactionType.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionTypeSchema } from './schemas/TransactionType.schema';
import { TransactionTypeController } from './controller/transactionType.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TransactionType', schema: TransactionTypeSchema },
    ]),
  ],
  providers: [TransactionTypeService],
  controllers: [TransactionTypeController],
  exports: [MongooseModule, TransactionTypeService],
})
export class TransactionTypeModule {}
