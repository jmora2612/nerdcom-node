import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { productsDTO } from 'src/shared/dtos';

/**
 * @method ProductsValidation()
 * Este Dto, es el encargado de validar el registro o creacion de la aplicacion
 */

export class ProductsValidation extends PartialType(productsDTO) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @MinLength(5)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  entryDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  expirationDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class ProductsUpdateValidation extends PartialType(productsDTO) {
  @IsString()
  @MaxLength(1000)
  @MinLength(5)
  description?: string;

  @IsDate()
  entryDate?: Date;

  @IsDate()
  expirationDate?: Date;

  @IsString()
  amount?: string;

  @IsString()
  price?: string;

  @IsString()
  status?: string;
}
