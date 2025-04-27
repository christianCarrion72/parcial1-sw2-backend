import { Injectable } from '@nestjs/common';
import { CreateCostoReparacionDto } from './dto/create-costo-reparacion.dto';
import { UpdateCostoReparacionDto } from './dto/update-costo-reparacion.dto';

@Injectable()
export class CostoReparacionService {
  create(createCostoReparacionDto: CreateCostoReparacionDto) {
    return 'This action adds a new costoReparacion';
  }

  findAll() {
    return `This action returns all costoReparacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} costoReparacion`;
  }

  update(id: number, updateCostoReparacionDto: UpdateCostoReparacionDto) {
    return `This action updates a #${id} costoReparacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} costoReparacion`;
  }
}
