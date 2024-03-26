import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Transaction } from '../schemas/Transaction.schema';
import { transactionDTO } from 'src/shared/dtos';
import { ProductsController } from 'src/libs/products/src/controller/products.controller';
import { TransactionTypeService } from 'src/libs/transaction-type/src';
import { ProductsService } from 'src/libs/products/src';
@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction') private transactionModel: Model<Transaction>,
    private readonly transactionTypeService: TransactionTypeService,
    private readonly productsService: ProductsService,
  ) {}

  async create(products: transactionDTO) {
    const { description, status, transactionType, product, amount } = products;
    let operation = 0;
    products.transactionType = new mongoose.Types.ObjectId(transactionType);
    products.product = new mongoose.Types.ObjectId(product);
    products.status = new mongoose.Types.ObjectId(status);

    const { description: typeTrans } =
      await this.transactionTypeService.findOne(products.transactionType);

    const data = await this.productsService.findOne(products.product);

    const findOne = await this.transactionModel.findOne({ description });

    if (findOne?.description === description)
      throw 'Ya existe una transaccion con esta descripcion.';

    if (typeTrans === 'salida') {
      if (Number(amount) > Number(data.amount)) {
        throw 'No hay cantidad de articulos suficiente';
      }
      operation = Number(data.amount) - Number(amount);
    } else {
      operation = Number(data.amount) + Number(amount);
    }

    const transaction = await new this.transactionModel(products).save();

    if (transaction) {
      const producto = await this.productsService.update(products.product, {
        amount: operation.toString(),
      });
    }

    return transaction;
  }

  async findAll() {
    const aggregate = [
      {
        $lookup: {
          from: 'status',
          localField: 'status',
          foreignField: '_id',
          as: 'status',
        },
      },
      {
        $unwind: '$status',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $lookup: {
          from: 'transactiontypes',
          localField: 'transactionType',
          foreignField: '_id',
          as: 'transactionType',
        },
      },
      {
        $unwind: '$transactionType',
      },
      {
        $project: {
          description: 1,
          documentDate: 1,
          amount: 1,
          price: 1,
          totalPrice: 1,
          status: '$status.description',
          transactionType: '$transactionType.description',
          product: '$product.description',
        },
      },
    ];
    const findProducts = await this.transactionModel.aggregate(aggregate);
    return findProducts.length
      ? findProducts
      : (() => {
          throw 'No hay transacciones disponibles.';
        })();
  }

  async update(id, transaction: transactionDTO) {
    const { documentDate, transactionType, product, status, amount } =
      transaction;
    let operation = 0;
    let typeTrans;
    let data;
    if (documentDate) {
      transaction.documentDate = new Date(documentDate);
    }

    if (transactionType) {
      transaction.transactionType = new mongoose.Types.ObjectId(
        transactionType,
      );

      typeTrans = await this.transactionTypeService.findOne(
        transaction.transactionType,
      );
    }

    if (product) {
      transaction.product = new mongoose.Types.ObjectId(product);
      data = await this.productsService.findOne(product);
    }

    if (status) transaction.status = new mongoose.Types.ObjectId(status);

    const findOne = await this.transactionModel.findOne({
      _id: id,
    });

    if (findOne) {
      if (amount) {
        if (data) {
          if (typeTrans.description === 'salida') {
            if (Number(amount) > Number(data.amount)) {
              throw 'No hay cantidad de articulos suficiente';
            }
            operation = Number(data.amount) - Number(amount);
          } else {
            operation = Number(data.amount) + Number(amount);
          }
        } else {
          throw 'Si desea modificar la transaccion debe seleccionar un producto';
        }
      } else {
        throw 'Si desea modificar la transaccion debe ingresar una cantidad';
      }

      const transactionUpdate = await this.transactionModel
        .findByIdAndUpdate(id, transaction, { new: true })
        .exec();

      if (transactionUpdate) {
        const producto = await this.productsService.update(product, {
          amount: operation.toString(),
        });
      }

      return transactionUpdate;
    }
  }

  async findOne(id) {
    const findStatus = await this.transactionModel.findOne({ _id: id });

    return findStatus
      ? findStatus
      : (() => {
          throw 'El registro solicitado no existe.';
        })();
  }
}
