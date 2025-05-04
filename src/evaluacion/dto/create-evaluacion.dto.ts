import { IsDateString, IsIn, IsInt, IsOptional } from "class-validator";

export class CreateEvaluacionDto {
  @IsDateString()
  fecha: string; // formato ISO "YYYY-MM-DD"

  @IsIn(['F', 'S']) // F = Físico, S = Sonido
  tipo: string;

  @IsInt()
  vehiculoId: number; // referencia al vehículo

  @IsInt()
  @IsOptional()
  historialId?: number; // referencia al historial (opcional)
}
