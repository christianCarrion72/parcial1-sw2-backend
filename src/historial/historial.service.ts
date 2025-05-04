import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Historial } from './entities/historial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistorialService {

  constructor(
    @InjectRepository(Historial)
      private readonly historialRepository: Repository<Historial>
  ){}

  async create(createHistorialDto: CreateHistorialDto) {
   try {
      const historial = this.historialRepository.create(createHistorialDto);
      return await this.historialRepository.save(historial);
   } catch (error) {
      throw new Error('Error al crear el historial');
   }
  }

  async findAll() {
    return await this.historialRepository.find({
      relations: ['evaluaciones']
    });
  }

  async findOne(id: number) {
    const historial = await this.historialRepository.findOne({
      where: { id }, relations: ['evaluaciones']
    });

    if (!historial) {
      throw new NotFoundException('Historial no encontrado');
    }
    return historial;
  }

  async update(id: number, updateHistorialDto: UpdateHistorialDto) {
    return `This action updates a #${id} historial`;
  }

  async remove(id: number) {
    return `This action removes a #${id} historial`;
  }
}
