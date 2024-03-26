/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TransactionSchema = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true, index: true })
  transactionType: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, required: true, index: true })
  product: mongoose.Types.ObjectId;

  @Prop({ required: true, type: Date })
  documentDate: Date;

  @Prop({ required: true, type: String })
  amount: string;

  @Prop({ required: true, type: String })
  price: string;

  @Prop({ required: true, type: String })
  totalPrice: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true, index: true })
  status: mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
