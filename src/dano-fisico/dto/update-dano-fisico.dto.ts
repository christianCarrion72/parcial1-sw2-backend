import { PartialType } from '@nestjs/mapped-types';
import { CreateDanoFisicoDto } from './create-dano-fisico.dto';

export class UpdateDanoFisicoDto extends PartialType(CreateDanoFisicoDto) {}
