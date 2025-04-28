import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { VehiculoModule } from '@/vehiculo/vehiculo.module';
import { Vehiculo } from '@/vehiculo/entities/vehiculo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evaluacion,Vehiculo]),
    VehiculoModule, 
  ],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
  exports:[EvaluacionService]
})
export class EvaluacionModule {}
