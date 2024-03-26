import { Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './schemas/Status.schema';
import { ProductsController } from './controller/products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [MongooseModule, ProductsService],
})
export class ProductsModule {}
