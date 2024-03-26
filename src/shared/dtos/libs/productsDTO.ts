/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';

export class productsDTO {
  _id?: mongoose.Types.ObjectId;
  description?: string;
  entryDate?: Date;
  expirationDate?: Date;
  amount?: string;
  price?: string;
  status?: string | mongoose.Types.ObjectId;
}
