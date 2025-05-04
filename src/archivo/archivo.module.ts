import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { S3Provider } from './provider/s3/s3.provider';
import { EvaluacionModule } from '@/evaluacion/evaluacion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { EvaluacionService } from '@/evaluacion/evaluacion.service';
import { Evaluacion } from '@/evaluacion/entities/evaluacion.entity';
import { DanoFisicoModule } from '@/dano-fisico/dano-fisico.module';
import { HistorialModule } from '@/historial/historial.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Archivo, Evaluacion]),
    EvaluacionModule,
    DanoFisicoModule,
    HistorialModule,
  ],
  controllers: [ArchivoController],
  providers: [ArchivoService, S3Provider],
  exports:[ArchivoService]
})
export class ArchivoModule {}
