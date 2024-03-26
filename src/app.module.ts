import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusModule } from './libs/status/src';
import { TransactionTypeModule } from './libs/transaction-type/src';
import { ProductsModule } from './libs/products/src';
import { TransactionModule } from './libs/transaction/src';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://127.0.0.1:27017/nerdcom',
      }),
    }),
    StatusModule,
    TransactionTypeModule,
    ProductsModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
