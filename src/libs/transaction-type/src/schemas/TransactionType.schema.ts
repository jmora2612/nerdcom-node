/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TransactionTypeSchema = TransactionType & Document;

@Schema()
export class TransactionType {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TransactionTypeSchema = SchemaFactory.createForClass(TransactionType);