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
import { ProductsService } from '../service/products.service';
import {
  ProductsUpdateValidation,
  ProductsValidation,
} from '../validations/ProductsValidation';

@ApiTags('Products')
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({})
  @ApiBody({ type: ProductsValidation })
  @Post(URLS.createProducts)
  async create(
    @Body() createdProducts: ProductsValidation,
    @Res() res: Response,
  ) {
    await this.productsService
      .create(createdProducts)
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

  @Get(URLS.listProducts)
  @ApiQuery({ name: 'description', required: false, type: String })
  @ApiQuery({ name: 'amount', required: false, type: String })
  @ApiQuery({ name: 'price', required: false, type: String })
  async getUsers(@Query() request, @Res() res: Response) {
    await this.productsService
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
  @Put(URLS.updateProducts)
  async update(
    @Param('id') _id: string,
    @Body() updateValidation: ProductsUpdateValidation,
    @Res() res: Response,
  ) {
    await this.productsService
      .update(_id, updateValidation)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Articulo actualizado de forma exitosa.',
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
  @Get(URLS.searchProducts)
  async findOne(@Param('id') _id: string, @Res() res: Response) {
    await this.productsService
      .findOne(_id)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Articulo encontrada.',
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
