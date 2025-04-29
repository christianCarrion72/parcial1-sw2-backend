import { Module } from '@nestjs/common';
import { DanoFisicoService } from './dano-fisico.service';
import { DanoFisicoController } from './dano-fisico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanoFisico } from './entities/dano-fisico.entity';
import { Evaluacion } from '@/evaluacion/entities/evaluacion.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([DanoFisico,Evaluacion])
  ],
  controllers: [DanoFisicoController],
  providers: [DanoFisicoService],
  exports:[DanoFisicoService]
})
export class DanoFisicoModule {}
