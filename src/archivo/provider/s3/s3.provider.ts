import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UploadFileDto } from 'src/archivo/dto/upload-file.dto';


@Injectable()
export class S3Provider {
  s3; 

  constructor() {
    AWS.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      });

      this.s3 = new AWS.S3();
  }

  async uploadFile(body: UploadFileDto) {
    const { file, fileName } = body;
    const bucket = process.env.S3_BUCKET;

    if (!bucket) {
      throw new Error(
        'S3_BUCKET no está configurado en las variables de entorno',
      );
    }

    const params = {
      Bucket: bucket,
      Key: `/archivo/${fileName}`,
      ACL: 'public-read',
      Body: file.buffer,
      ContentType: file.mimetype
    };

    try{
        const responseS3 = await this.s3.upload(params).promise();
        //console.log(responseS3.Location);
        return responseS3; 
    }catch (error) {
        throw error;
    }
  }
}
