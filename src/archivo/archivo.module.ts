import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { S3Provider } from './provider/s3/s3.provider';

@Module({
  controllers: [ArchivoController],
  providers: [ArchivoService, S3Provider],
})
export class ArchivoModule {}
