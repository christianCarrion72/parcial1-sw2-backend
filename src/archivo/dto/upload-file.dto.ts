import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UploadFileDto{
    @IsNotEmpty()
    @IsString()
    readonly fileName: string;

    file: Express.Multer.File;

    @IsNotEmpty()
    @IsNumber()
    vehiculoId: number;

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @IsString()
    placa: string;
}