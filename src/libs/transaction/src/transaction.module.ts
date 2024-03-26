import { Module } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/Transaction.schema';
import { TransactionController } from './controller/transaction.controller';
import {
  TransactionTypeModule,
  TransactionTypeService,
} from 'src/libs/transaction-type/src';
import { ProductsModule, ProductsService } from 'src/libs/products/src';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
    TransactionTypeModule,
    ProductsModule,
  ],
  providers: [TransactionService, TransactionTypeService, ProductsService],
  controllers: [TransactionController],
  exports: [MongooseModule, TransactionService],
})
export class TransactionModule {}
