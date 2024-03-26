import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Products } from '../schemas/Status.schema';
import { productsDTO } from 'src/shared/dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private productsModel: Model<Products>,
  ) {}

  async create(products: productsDTO) {
    const { description, status } = products;
    products.status = new mongoose.Types.ObjectId(status);
    const findOne = await this.productsModel.findOne({ description });

    if (findOne?.description === description)
      throw 'Ya existe un articulo con esta descripcion.';

    return await new this.productsModel(products).save();
  }

  async findAll(request) {
    const query = {};
    const { description, amount, price } = request;
    if (description) {
      query['description'] = description;
    }
    if (amount) {
      query['amount'] = amount;
    }
    if (price) {
      query['price'] = price;
    }

    const aggregate = await this.findFilter(query);

    return aggregate.length
      ? aggregate
      : (() => {
          throw 'No hay articulos disponibles.';
        })();
  }

  async update(id, products: productsDTO) {
    const { entryDate, expirationDate, status } = products;
    if (products.status) {
      products.status = new mongoose.Types.ObjectId(status);
    }
    if (entryDate) {
      products.entryDate = new Date(entryDate);
    }
    if (expirationDate) {
      products.expirationDate = new Date(expirationDate);
    }

    const findOne = await this.productsModel.findOne({
      _id: id,
    });

    if (findOne) {
      return await this.productsModel
        .findByIdAndUpdate(id, products, { new: true })
        .exec();
    }
  }

  async findOne(id) {
    const query = {};
    if (id) {
      query['_id'] = new mongoose.Types.ObjectId(id);
    }

    const aggregate = await this.findFilter(query);

    return aggregate
      ? aggregate[0]
      : (() => {
          throw 'El registro solicitado no existe.';
        })();
  }

  async findFilter(filter) {
    const aggregate = [
      {
        $match: filter,
      },
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
        $project: {
          description: 1,
          entryDate: 1,
          expirationDate: 1,
          amount: 1,
          price: 1,
          status: {
            $cond: {
              if: { $eq: [filter?._id, undefined] },
              then: '$status.description',
              else: '$status._id',
            },
          },
        },
      },
    ];
    const findProducts = await this.productsModel.aggregate(aggregate);
    return findProducts;
  }
}
