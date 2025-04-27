import { Module } from '@nestjs/common';
import { CostoReparacionService } from './costo-reparacion.service';
import { CostoReparacionController } from './costo-reparacion.controller';

@Module({
  controllers: [CostoReparacionController],
  providers: [CostoReparacionService],
})
export class CostoReparacionModule {}
