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
import { TransactionService } from '../service/transaction.service';
import {
  TransactionUpdateValidation,
  TransactionValidation,
} from '../validations/TransactionValidation';

@ApiTags('Transaction')
@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({})
  @ApiBody({ type: TransactionValidation })
  @Post(URLS.createTransaction)
  async create(
    @Body() createdTransaction: TransactionValidation,
    @Res() res: Response,
  ) {
    await this.transactionService
      .create(createdTransaction)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Estado creado de forma exitosa.',
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

  @Get(URLS.listTransaction)
  async getUsers(@Res() res: Response) {
    await this.transactionService
      .findAll()
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
  @ApiBody({ type: TransactionUpdateValidation })
  @Put(URLS.updateTransaction)
  async update(
    @Param('id') _id: string,
    @Body() updateValidation: TransactionUpdateValidation,
    @Res() res: Response,
  ) {
    await this.transactionService
      .update(_id, updateValidation)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Transaccion actualizada de forma exitosa.',
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
  @Get(URLS.searchTransaction)
  async findOne(@Param('id') _id: string, @Res() res: Response) {
    await this.transactionService
      .findOne(_id)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Transaccion encontrada.',
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
