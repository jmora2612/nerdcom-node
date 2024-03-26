import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { statusDTO } from 'src/shared/dtos';

/**
 * @method StatusValidation()
 * Este Dto, es el encargado de validar el registro o creacion de la aplicacion
 */

export class StatusValidation extends PartialType(statusDTO) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @MinLength(5)
  description: string;
}

export class StatusUpdateValidation extends PartialType(statusDTO) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @MinLength(5)
  description: string;
}
