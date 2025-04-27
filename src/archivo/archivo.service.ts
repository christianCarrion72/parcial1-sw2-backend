import { Injectable } from '@nestjs/common';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { S3Provider } from './provider/s3/s3.provider';

@Injectable()
export class ArchivoService {

  constructor(
    private readonly s3Provider: S3Provider,
  ){}

  create(createArchivoDto: CreateArchivoDto) {
    return 'This action adds a new archivo';
  }

  findAll() {
    return `This action returns all archivo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} archivo`;
  }

  update(id: number, updateArchivoDto: UpdateArchivoDto) {
    return `This action updates a #${id} archivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} archivo`;
  }

  uploadFile(body: UploadFileDto){
    return this.s3Provider.uploadFile(body);
  }
}
