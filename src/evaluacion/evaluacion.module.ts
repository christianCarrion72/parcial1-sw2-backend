import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { VehiculoModule } from '@/vehiculo/vehiculo.module';
import { Vehiculo } from '@/vehiculo/entities/vehiculo.entity';
import { HistorialModule } from '@/historial/historial.module';
import { Historial } from '@/historial/entities/historial.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evaluacion, Vehiculo, Historial]),
    VehiculoModule,
    HistorialModule,
  ],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
  exports:[EvaluacionService]
})
export class EvaluacionModule {}
