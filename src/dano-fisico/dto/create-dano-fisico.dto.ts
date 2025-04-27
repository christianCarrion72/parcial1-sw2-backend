import { IsIn, IsInt, IsOptional } from "class-validator";

export class CreateDanoFisicoDto {
  @IsIn(['abolladura', 'rayon', 'grieta'])
  tipo: string;

  @IsIn(['leve', 'moderado', 'severo'])
  gravedad: string;

  @IsInt()
  @IsOptional()
  evaluacionId?: number; 
}
