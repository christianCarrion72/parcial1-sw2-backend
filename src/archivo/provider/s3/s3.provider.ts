import { ArchivoService } from '@/archivo/archivo.service';
import { DanoFisicoService } from '@/dano-fisico/dano-fisico.service';
import { CreateEvaluacionDto } from '@/evaluacion/dto/create-evaluacion.dto';
import { EvaluacionService } from '@/evaluacion/evaluacion.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import axios from 'axios';
import { UploadFileDto } from 'src/archivo/dto/upload-file.dto';
import * as FormData from 'form-data';
import { HistorialService } from '@/historial/historial.service';

//Interfaz para respuesta Ai Query
export interface AiQueryResponse {
  resultados: AiQuery[];
}

export interface AiQuery {
  nivel: string;
  detecciones: number;
  archivo?: string;
}

@Injectable()
export class S3Provider {
  private s3: AWS.S3; 

  constructor(
    private readonly evaluacionService: EvaluacionService,
    @Inject(forwardRef(() => ArchivoService))
    private readonly archivoService: ArchivoService,
    private readonly danoFisicoService: DanoFisicoService,
    private readonly historialService: HistorialService,
  ) {
    AWS.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      });

      this.s3 = new AWS.S3();
  }

  async uploadFile(body: UploadFileDto) {
    const { file, fileName, vehiculoId } = body;
    const placa = body.placa.toUpperCase();
    const bucket = process.env.S3_BUCKET;

    if (!bucket) {
      throw new Error(
        'S3_BUCKET no está configurado en las variables de entorno',
      );
    }
    try{
        let historial;
        try {
          // Existe historial?
          const historiales = await this.historialService.findAll();
          historial = historiales.find(h => h.placa === placa);
          // Si no existe crear uno
          if (!historial) {
            historial = await this.historialService.create({ placa });
            console.log(`Nuevo historial creado para placa: ${placa}`);
          }else{
            console.log(`Historial existente encontrado para placa: ${placa}`);
          }
        } catch (error) {
          console.error('Error al buscar/crear historial:', error);
          throw new Error(`Error al procesar historial: ${error.message}`);
        }
        // Subir el archivo a S3
        const responseS3 = await this.uploadToS3(bucket, fileName, file);
        
        // Crear evaluacion 
        const evaluacion = await this.createEvaluacion(vehiculoId,file.mimetype, historial.id);
        
        //Ai Query
        //const respuestaAiQuery2 = await this.aiQuery(responseS3.Location);
        //console.log('Respuesta AI Query:', respuestaAiQuery);

        //Ai Query - ahora pasando el archivo real
        const respuestaAiQuery = await this.aiQuery2(file);
        // Crear archivo
        const archivo = await this.registerFile(responseS3.Location, evaluacion.id, file.mimetype);
      
        // Crear daño físico si es una imagen
        let danoFisico;
        if (file.mimetype.startsWith('image')) {
          danoFisico = await this.createDanoFisico(evaluacion.id, respuestaAiQuery);
        }

        // Obtener la evaluación completa con todas sus relaciones
        const evaluacionCompleta = await this.evaluacionService.findOne(evaluacion.id);
        
        return {
          responseS3,
          respuestaAiQuery,
          evaluacion: evaluacionCompleta,
          archivo,
          danoFisico,
          historial
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

  private async createEvaluacion(vehiculoId: number, mimetype: string, historialId?: number){
    const ahora = new Date();
    const fechaHora = `${ahora.toISOString().split('T')[0]} ${ahora.getHours()}:${ahora.getMinutes()}:${ahora.getSeconds()}`;
    const evaluacionDto: CreateEvaluacionDto = {
      fecha: fechaHora, // fecha actual en formato ISO "YYYY-MM-DD"
      tipo: mimetype.startsWith('image') ? 'F' : 'S', // F = Físico, S = Sonido
      vehiculoId,
      historialId
    }
  
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

  private async aiQuery(url: string, intentos = 3):Promise<AiQuery>{
    try {
      const urlApiExterna = process.env.URL_API_EXTERNA || 'apiExterna.com';
      //console.log('URL API Externa:', urlApiExterna);
      //enviar solicitud POST
      const respuesta = await axios.post(urlApiExterna, { archivo: url }, {
        timeout: 60000 // 30 segundos de timeout
      });
      // Extraer el primer resultado del array resultados
    const apiResponse = respuesta.data as AiQueryResponse;
    if (apiResponse.resultados && apiResponse.resultados.length > 0) {
      return apiResponse.resultados[0];
    }  
    // Si no hay resultados, devolver un valor predeterminado
    return {
      nivel: 'sin daño',
      detecciones: 0
    };
    } catch (error) {
      console.error(`Error al enviar el archivo a Api externa (intentos restantes: ${intentos-1}):`, error);
      
      // Si aún quedan intentos, reintenta la operación
      if (intentos > 1) {
        console.log(`Reintentando... (${intentos-1} intentos restantes)`);
        return this.aiQuery(url, intentos - 1);
      }
      
      // Si es el último intento, lanza el error
      if (error.code === 'ECONNABORTED') {
        throw new Error('La API externa tardó demasiado en responder');
      }
      throw new Error(`Error al enviar archivo a API externa: ${error.message}`);
    }
  }

  private async createDanoFisico(evaluacionId: number, respuestaAiQuery: AiQuery){
      try {
        // Determinar el tipo de daño basado en el nivel
        let tipo: string;
        switch(respuestaAiQuery.nivel) {
          case 'leve':
            tipo = 'rayon';
            break;
          case 'moderado':
            tipo = 'grieta';
            break;
          case 'severo':
          default:
            tipo = 'abolladura';
            break;
        } 
      const danoFisicoDto = {
        tipo,
        gravedad: respuestaAiQuery.nivel,
        evaluacionId
      }; 
      return await this.danoFisicoService.create(danoFisicoDto)
    }catch (error) {
      console.error('Error al crear daño físico:', error);
      return null;
    }
  }

  private async aiQuery2(file: Express.Multer.File, intentos = 3):Promise<AiQuery>{
    try {
      const urlApiExterna = process.env.URL_APII_EXTERNA || 'apiExterna.com';
      
      // Crear un objeto FormData
      const formData = new FormData();
      
      // Añadir el archivo al FormData
      formData.append('files', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype
      });
      
      // Enviar el FormData con el archivo
      const respuesta = await axios.post(urlApiExterna, formData, {
        timeout: 60000, // 60 segundos de timeout
        headers: {
          ...formData.getHeaders() // Esto establece el Content-Type correcto con boundary
        }
      });
      // Extraer el primer resultado del array resultados
    const apiResponse = respuesta.data as AiQueryResponse;
    if (apiResponse.resultados && apiResponse.resultados.length > 0) {
      return apiResponse.resultados[0];
    }
    
    // Si no hay resultados, devolver un valor predeterminado
    return {
      nivel: 'sin daño',
      detecciones: 0
    };
    } catch (error) {
      console.error(`Error al enviar el archivo a Api externa (intentos restantes: ${intentos-1}):`, error);
      
      // Si aún quedan intentos, reintenta la operación
      if (intentos > 1) {
        console.log(`Reintentando... (${intentos-1} intentos restantes)`);
        return this.aiQuery2(file, intentos - 1);
      }
      
      // Si es el último intento, lanza el error
      if (error.code === 'ECONNABORTED') {
        throw new Error('La API externa tardó demasiado en responder');
      }
      throw new Error(`Error al enviar archivo a API externa: ${error.message}`);
    }
  }
}