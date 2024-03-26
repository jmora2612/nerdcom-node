import { Module } from '@nestjs/common';
import { StatusService } from './service/status.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusController } from './controller/status.controller';
import { StatusSchema } from './schemas/Status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Status', schema: StatusSchema }]),
  ],
  providers: [StatusService],
  controllers: [StatusController],
  exports: [MongooseModule, StatusService],
})
export class StatusModule {}
