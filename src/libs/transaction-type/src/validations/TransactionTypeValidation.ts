import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { transactionTypeDTO } from 'src/shared/dtos';

/**
 * @method TransactionTypeValidation()
 * Este Dto, es el encargado de validar el registro o creacion de la aplicacion
 */

export class TransactionTypeValidation extends PartialType(transactionTypeDTO) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @MinLength(5)
  description: string;
}

export class TransactionTypeUpdateValidation extends PartialType(
  transactionTypeDTO,
) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @MinLength(5)
  description: string;
}
