import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { S3Provider } from './provider/s3/s3.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { Repository } from 'typeorm';
import { Evaluacion } from '@/evaluacion/entities/evaluacion.entity';

@Injectable()
export class ArchivoService {

  constructor(
    @InjectRepository(Archivo)
    private readonly archivoRepository: Repository<Archivo>,
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
    @Inject(forwardRef(() => S3Provider))
    private readonly s3Provider: S3Provider,
  ){}

  async create(createArchivoDto: CreateArchivoDto) {
    try {
      const evaluacion = await this.evaluacionRepository.findOneBy({
        id: createArchivoDto.evaluacionId
      });
      if(!evaluacion){
        throw new BadRequestException(`Evaluacion no encontrada`);
      }
      return await this.archivoRepository.save({
        ...createArchivoDto,
        evaluacion,
      }) 
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Error al crear el archivo: ${error.message}`);
    }
  }

  async findAll() {
    return await this.archivoRepository.find();
  }

  async findOne(id: number) {
    return await this.archivoRepository.findOneBy({id});
  }

  async update(id: number, updateArchivoDto: UpdateArchivoDto) {
    return `This action updates a #${id} archivo`;
  }

  async remove(id: number) {
    return await this.archivoRepository.softDelete(id);
  }

  uploadFile(body: UploadFileDto){
    return this.s3Provider.uploadFile(body);
  }
}
