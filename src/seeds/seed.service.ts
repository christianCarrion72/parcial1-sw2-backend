import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedVehiculos } from './vehiculos.seed';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async run() {
    console.log('Iniciando seeding de Vehículos...');
    await seedVehiculos(this.dataSource);
    console.log('Seeding de Vehículos completado.');
  }
}