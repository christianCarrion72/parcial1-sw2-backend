import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateCostoReparacionDto {
  @IsString()
  tipo_daño: string; // abolladura, rayón, etc.

  @IsString()
  rango_precio: string; // ejemplo: "$50–$100"

  @IsInt()
  @IsOptional()
  danoFisicoId?: number; // A qué daño físico pertenece
}
