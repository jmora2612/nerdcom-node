/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';

export class transactionDTO {
  _id?: mongoose.Types.ObjectId;
  description?: string;
  transactionType?: string | mongoose.Types.ObjectId;
  product?: string | mongoose.Types.ObjectId;
  documentDate?: Date;
  amount?: string;
  price?: string;
  totalPrice?: string;
  status?: string | mongoose.Types.ObjectId;
}
