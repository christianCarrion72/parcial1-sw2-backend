import { PartialType } from '@nestjs/mapped-types';
import { CreateCostoReparacionDto } from './create-costo-reparacion.dto';

export class UpdateCostoReparacionDto extends PartialType(CreateCostoReparacionDto) {}
