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
import { StatusService } from '../service/status.service';
import {
  StatusUpdateValidation,
  StatusValidation,
} from '../validations/StatusValidation';

@ApiTags('Status')
@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({})
  @ApiBody({ type: StatusValidation })
  @Post(URLS.createStatus)
  async create(@Body() createdStatus: StatusValidation, @Res() res: Response) {
    await this.statusService
      .create(createdStatus)
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

  @Get(URLS.listStatus)
  @ApiQuery({ name: 'description', required: false, type: String })
  async getUsers(@Query() request, @Res() res: Response) {
    await this.statusService
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
  @ApiBody({ type: StatusUpdateValidation })
  @Put(URLS.updateStatus)
  async update(
    @Param('id') _id: string,
    @Body() updateValidation: StatusUpdateValidation,
    @Res() res: Response,
  ) {
    await this.statusService
      .update(_id, updateValidation)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Estatus actualizado de forma exitosa.',
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
  @Get(URLS.searchStatus)
  async findOne(@Param('id') _id: string, @Res() res: Response) {
    await this.statusService
      .findOne(_id)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Estatus encontrado.',
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
