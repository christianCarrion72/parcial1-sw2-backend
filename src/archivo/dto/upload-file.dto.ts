import { IsBase64, IsNotEmpty, IsString } from "class-validator";

export class UploadFileDto{
    @IsNotEmpty()
    @IsString()
    readonly fileName: string;

    file: Express.Multer.File;
}