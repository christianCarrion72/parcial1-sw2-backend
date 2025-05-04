import { IsString, MaxLength } from 'class-validator';

export class CreateHistorialDto {
    @IsString()
    @MaxLength(7)
    placa: string;
}