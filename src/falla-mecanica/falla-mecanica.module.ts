import { Module } from '@nestjs/common';
import { FallaMecanicaService } from './falla-mecanica.service';
import { FallaMecanicaController } from './falla-mecanica.controller';

@Module({
  controllers: [FallaMecanicaController],
  providers: [FallaMecanicaService],
})
export class FallaMecanicaModule {}
