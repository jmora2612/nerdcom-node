/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';

export class transactionTypeDTO {
  _id?: mongoose.Types.ObjectId;
  description: string;
}
