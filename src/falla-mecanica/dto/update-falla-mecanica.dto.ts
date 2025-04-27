import { PartialType } from '@nestjs/mapped-types';
import { CreateFallaMecanicaDto } from './create-falla-mecanica.dto';

export class UpdateFallaMecanicaDto extends PartialType(CreateFallaMecanicaDto) {}
