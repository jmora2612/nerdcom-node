import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { transactionDTO } from 'src/shared/dtos';

/**
 * @method TransactionValidation()
 * Este Dto, es el encargado de validar el registro o creacion de la aplicacion
 */

export class TransactionValidation extends PartialType(transactionDTO) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @MinLength(5)
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transactionType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  documentDate: Date;

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
  totalPrice: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class TransactionUpdateValidation extends PartialType(transactionDTO) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @MinLength(5)
  description?: string;

  @IsString()
  @IsNotEmpty()
  transactionType?: string;

  @IsString()
  @IsNotEmpty()
  product?: string;

  @IsNotEmpty()
  @IsDate()
  documentDate?: Date;

  @IsString()
  @IsNotEmpty()
  amount?: string;

  @IsString()
  @IsNotEmpty()
  price?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  totalPrice?: string;

  @IsString()
  @IsNotEmpty()
  status?: string;
}
