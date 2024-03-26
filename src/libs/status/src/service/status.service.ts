import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Status } from '../schemas/Status.schema';
import { Model } from 'mongoose';
import { statusDTO } from 'src/shared/dtos';

@Injectable()
export class StatusService {
  constructor(@InjectModel('Status') private statusModel: Model<Status>) {}

  async create(status: statusDTO) {
    const { description } = status;

    const findOne = await this.statusModel.findOne({ description });

    if (findOne?.description === description)
      throw 'Ya existe un registro con este estatus.';

    return await new this.statusModel(status).save();
  }

  async findAll(request) {
    const query = {};
    const { description } = request;
    if (description) {
      query['description'] = description;
    }

    const findStatus = await this.statusModel.find(query);

    return findStatus.length
      ? findStatus
      : (() => {
          throw 'No hay estatus disponibles.';
        })();
  }

  async update(id, status: statusDTO) {
    const { description } = status;
    const findOne = await this.statusModel.findOne({ _id: id });

    if (findOne) {
      const findOneStatus = await this.statusModel.findOne({ description });

      if (findOneStatus?.description === status.description)
        throw 'Ya existe un registro con este estatus.';
      return await this.statusModel
        .findByIdAndUpdate(id, status, { new: true })
        .exec();
    } else {
      throw 'No existe el registro solicitado.';
    }
  }

  async findOne(id) {
    const findStatus = await this.statusModel.findOne({ _id: id });

    return findStatus
      ? findStatus
      : (() => {
          throw 'El registro solicitado no existe.';
        })();
  }
}
