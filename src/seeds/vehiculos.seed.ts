import { DataSource } from 'typeorm';
import { Vehiculo } from '../vehiculo/entities/vehiculo.entity';

export async function seedVehiculos(dataSource: DataSource) {
  const vehiculoRepository = dataSource.getRepository(Vehiculo);

  const vehiculosData = [
    { marca: 'Toyota', modelo: 'Corolla', año: 2015 },
    { marca: 'Honda', modelo: 'Civic', año: 2018 },
    { marca: 'Ford', modelo: 'Focus', año: 2017 },
    { marca: 'Chevrolet', modelo: 'Cruze', año: 2016 },
    { marca: 'Nissan', modelo: 'Sentra', año: 2019 },
  ];

  for (const vehiculoData of vehiculosData) {
    const existingVehiculo = await vehiculoRepository.findOneBy({
      marca: vehiculoData.marca,
      modelo: vehiculoData.modelo,
      año: vehiculoData.año,
    });

    if (!existingVehiculo) {
      const vehiculo = vehiculoRepository.create(vehiculoData);
      await vehiculoRepository.save(vehiculo);
      console.log(`Vehículo ${vehiculo.marca} ${vehiculo.modelo} insertado.`);
    } else {
      console.log(`Vehículo ${vehiculoData.marca} ${vehiculoData.modelo} ya existe.`);
    }
  }
}