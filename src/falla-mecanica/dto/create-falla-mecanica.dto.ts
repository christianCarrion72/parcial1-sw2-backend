import { IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class CreateFallaMecanicaDto {
    @IsString()
    descripcion: string;

    @IsIn(['baja', 'media', 'alta'])
    urgencia: string;

    @IsInt()
    @IsOptional()
    evaluacionId?: number;
}
