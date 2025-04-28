import { ArchivoService } from '@/archivo/archivo.service';
import { CreateEvaluacionDto } from '@/evaluacion/dto/create-evaluacion.dto';
import { EvaluacionService } from '@/evaluacion/evaluacion.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UploadFileDto } from 'src/archivo/dto/upload-file.dto';


@Injectable()
export class S3Provider {
  private s3: AWS.S3; 

  constructor(
    private readonly evaluacionService: EvaluacionService,
    @Inject(forwardRef(() => ArchivoService))
    private readonly archivoService: ArchivoService,
  ) {
    AWS.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      });

      this.s3 = new AWS.S3();
  }

  async uploadFile(body: UploadFileDto) {
    const { file, fileName, vehiculoId } = body;
    const bucket = process.env.S3_BUCKET;

    if (!bucket) {
      throw new Error(
        'S3_BUCKET no está configurado en las variables de entorno',
      );
    }
    try{
        // Subir el archivo a S3
        const responseS3 = await this.uploadToS3(bucket, fileName, file);
        //console.log(responseS3);
        // Crear evaluacion 
        const evaluacion = await this.createEvaluacion(vehiculoId,file.mimetype);
        //console.log(evaluacion);
        // Crear archivo
        const archivo = await this.registerFile(responseS3.Location, evaluacion.id, file.mimetype);
        //console.log(archivo);
        return {
          responseS3,
          evaluacion,
          archivo
        }; 
    }catch (error) {
        throw error;
    }
  }

  private async uploadToS3(bucket: string, fileName: string, file: Express.Multer.File) {
    const params = {
      Bucket: bucket,
      Key: `/archivo/${fileName}`,
      ACL: 'public-read',
      Body: file.buffer,
      ContentType: file.mimetype
    };

    return await this.s3.upload(params).promise();
  }

  private async createEvaluacion(vehiculoId: number, mimetype: string){
    const evaluacionDto: CreateEvaluacionDto = {
      fecha: new Date().toISOString().split('T')[0], // fecha actual en formato ISO "YYYY-MM-DD"
      tipo: mimetype.startsWith('image') ? 'F' : 'S', // F = Físico, S = Sonido
      vehiculoId
    }
    console.log(evaluacionDto);
    return await this.evaluacionService.create(evaluacionDto);
  }

  private async registerFile(url: string, evaluacionId: number, mimetype: string){
    const archivoDto = {
      url,
      tipo: mimetype.startsWith('image') ? 'I' : 'A',
      evaluacionId
    };
    
    return await this.archivoService.create(archivoDto);
  }
}
