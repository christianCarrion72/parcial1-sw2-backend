import { Module } from '@nestjs/common';
import { DanoFisicoService } from './dano-fisico.service';
import { DanoFisicoController } from './dano-fisico.controller';

@Module({
  controllers: [DanoFisicoController],
  providers: [DanoFisicoService],
})
export class DanoFisicoModule {}
