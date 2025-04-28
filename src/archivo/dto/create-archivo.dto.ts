import { IsIn, IsInt, IsOptional, IsUrl } from "class-validator";

export class CreateArchivoDto {
    @IsUrl()
    url: string;

    @IsIn(['I','A'])
    tipo: string;

    @IsInt()
    @IsOptional()
    evaluacionId?: number;
}
