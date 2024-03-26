/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ProductsSchema = Products & Document;

@Schema()
export class Products {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Date })
  entryDate: Date;

  @Prop({ required: true, type: Date })
  expirationDate: Date;

  @Prop({ required: true, type: String })
  amount: string;

  @Prop({ required: true, type: String })
  price: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true, index: true })
  status: mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
