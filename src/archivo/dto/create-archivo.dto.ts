import { IsIn, IsInt, IsOptional, IsUrl } from "class-validator";

export class CreateArchivoDto {
    @IsUrl()
    url: string;

    @IsIn(['imagen','audio'])
    tipo: string;

    @IsInt()
    @IsOptional()
    evaluacionId?: number;
}
