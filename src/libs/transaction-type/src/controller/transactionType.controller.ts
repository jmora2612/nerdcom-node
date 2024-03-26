import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { URLS } from 'src/shared/urls';
import { TransactionTypeService } from '../service/transactionType.service';
import {
  TransactionTypeUpdateValidation,
  TransactionTypeValidation,
} from '../validations/TransactionTypeValidation';

@ApiTags('TransactionType')
@Controller()
export class TransactionTypeController {
  constructor(
    private readonly transactionTypeService: TransactionTypeService,
  ) {}

  @ApiOperation({})
  @ApiBody({ type: TransactionTypeValidation })
  @Post(URLS.createTransactionType)
  async create(
    @Body() createdTransactionType: TransactionTypeValidation,
    @Res() res: Response,
  ) {
    await this.transactionTypeService
      .create(createdTransactionType)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Tipo de transaccion creada de forma exitosa.',
        };
        res.status(200).send(response);
      })
      .catch((error) => {
        const response = {
          status: 'error',
          message: error,
        };
        res.status(500).send(response);
      });
  }

  @Get(URLS.listTransactionType)
  @ApiQuery({ name: 'description', required: false, type: String })
  async getUsers(@Query() request, @Res() res: Response) {
    await this.transactionTypeService
      .findAll(request)
      .then((result) => {
        const response = {
          status: 'Registro exitoso',
          data: result,
        };
        res.status(200).send(response);
      })
      .catch((error) => {
        const response = {
          status: 'error',
          message: error,
        };
        res.status(500).send(response);
      });
  }

  @ApiOperation({})
  @ApiBody({ type: TransactionTypeUpdateValidation })
  @Put(URLS.updateTransactionType)
  async update(
    @Param('id') _id: string,
    @Body() updateValidation: TransactionTypeUpdateValidation,
    @Res() res: Response,
  ) {
    await this.transactionTypeService
      .update(_id, updateValidation)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Tipo de transaccion actualizada de forma exitosa.',
        };
        res.status(200).send(response);
      })
      .catch((error) => {
        const response = {
          status: 'error',
          message: error,
        };
        res.status(500).send(response);
      });
  }

  @ApiOperation({})
  @Get(URLS.searchTransactionType)
  async findOne(@Param('id') _id: string, @Res() res: Response) {
    await this.transactionTypeService
      .findOne(_id)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Tipo de transaccion encontrado.',
        };
        res.status(200).send(response);
      })
      .catch((error) => {
        const response = {
          status: 'error',
          message: error,
        };
        res.status(500).send(response);
      });
  }
}
