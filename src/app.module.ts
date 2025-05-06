import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { DanoFisicoModule } from './dano-fisico/dano-fisico.module';
import { FallaMecanicaModule } from './falla-mecanica/falla-mecanica.module';
import { ArchivoModule } from './archivo/archivo.module';
import { CostoReparacionModule } from './costo-reparacion/costo-reparacion.module';
import { Vehiculo } from './vehiculo/entities/vehiculo.entity';
import { Evaluacion } from './evaluacion/entities/evaluacion.entity';
import { DanoFisico } from './dano-fisico/entities/dano-fisico.entity';
import { CostoReparacion } from './costo-reparacion/entities/costo-reparacion.entity';
import { FallaMecanica } from './falla-mecanica/entities/falla-mecanica.entity';
import { Archivo } from './archivo/entities/archivo.entity';
import { HistorialModule } from './historial/historial.module';
import { Historial } from './historial/entities/historial.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Vehiculo,Evaluacion,DanoFisico,CostoReparacion,FallaMecanica,Archivo, Historial],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    VehiculoModule,
    EvaluacionModule,
    DanoFisicoModule,
    FallaMecanicaModule,
    ArchivoModule,
    CostoReparacionModule,
    HistorialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
