import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UploadFileDto{
    @IsNotEmpty()
    @IsString()
    readonly fileName: string;

    file: Express.Multer.File;

    @IsNotEmpty()
    @IsNumber()
    vehiculoId: number;
}