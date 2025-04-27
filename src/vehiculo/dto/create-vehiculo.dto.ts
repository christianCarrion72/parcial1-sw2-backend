import { IsInt, IsString, Max, Min } from "class-validator";

export class CreateVehiculoDto {
    
    @IsString()
    marca: string;

    @IsString()
    modelo: string;

    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    año: number;
}
