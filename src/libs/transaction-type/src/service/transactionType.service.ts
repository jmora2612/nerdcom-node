import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionType } from '../schemas/TransactionType.schema';
import { transactionTypeDTO } from 'src/shared/dtos';

@Injectable()
export class TransactionTypeService {
  constructor(
    @InjectModel('TransactionType')
    private transactionTypeModel: Model<TransactionType>,
  ) {}

  async create(transactionType: transactionTypeDTO) {
    const { description } = transactionType;

    const findOne = await this.transactionTypeModel.findOne({ description });

    if (findOne?.description === description)
      throw 'Ya existe un registro con este tipo de transaccion.';

    return await new this.transactionTypeModel(transactionType).save();
  }

  async findAll(request) {
    const query = {};
    const { description } = request;
    if (description) {
      query['description'] = description;
    }

    const findTransactionType = await this.transactionTypeModel.find(query);

    return findTransactionType.length
      ? findTransactionType
      : (() => {
          throw 'No hay tipos de transaccion disponibles.';
        })();
  }

  async update(id, transactionType: transactionTypeDTO) {
    const { description } = transactionType;
    const findOne = await this.transactionTypeModel.findOne({ _id: id });

    if (findOne) {
      const findOneTransactionType = await this.transactionTypeModel.findOne({
        description,
      });

      if (findOneTransactionType?.description === transactionType.description)
        throw 'Ya existe un registro con este tipo de transaccion.';
      return await this.transactionTypeModel
        .findByIdAndUpdate(id, transactionType, { new: true })
        .exec();
    } else {
      throw 'No existe el registro solicitado.';
    }
  }

  async findOne(id) {
    const findTransactionType = await this.transactionTypeModel.findOne({
      _id: id,
    });

    return findTransactionType
      ? findTransactionType
      : (() => {
          throw 'El registro solicitado no existe.';
        })();
  }
}
