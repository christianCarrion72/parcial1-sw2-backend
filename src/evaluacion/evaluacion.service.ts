import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { Repository } from 'typeorm';
import { Vehiculo } from '@/vehiculo/entities/vehiculo.entity';
import { Historial } from '@/historial/entities/historial.entity';

@Injectable()
export class EvaluacionService {

  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluationRepository: Repository<Evaluacion>,
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
    @InjectRepository(Historial)
    private readonly historialRepository: Repository<Historial>
  ) {}

  async create(createEvaluacionDto: CreateEvaluacionDto) {
    try {
      const vehiculo = await this.vehiculoRepository.findOne({
        where: {id: createEvaluacionDto.vehiculoId}
      });
  
      if(!vehiculo){
        throw new NotFoundException('Vehiculo no encontrado');
      }
      const evaluacion = this.evaluationRepository.create({
        fecha: createEvaluacionDto.fecha,
        tipo: createEvaluacionDto.tipo,
        vehiculo: vehiculo
      });

      if (createEvaluacionDto.historialId) {
        const historial = await this.historialRepository.findOne({
          where: { id: createEvaluacionDto.historialId}
        });

        if (!historial){
          throw new NotFoundException('Historial no encontrado');
        }
        evaluacion.historial = historial;
      }
      return await this.evaluationRepository.save(evaluacion);
    } catch (error) {
      throw new Error(`Error al crear evaluación: ${error.message}`);
    }
    
  }

  async findAll() {
    return await this.evaluationRepository.find({
      relations: ['vehiculo', 'archivos', 'historial']
    });
  }

  async findOne(id: number) {
    const evaluacion = await this.evaluationRepository.findOne({
      where: { id },
      relations: ['vehiculo', 'danosFisicos', 'fallasMecanicas', 'archivos', 'historial']
    });
    
    if (!evaluacion) {
      throw new NotFoundException(`Evaluación con ID ${id} no encontrada`);
    }
    
    return evaluacion;
  }

  async update(id: number, updateEvaluacionDto: UpdateEvaluacionDto) {
    return `This action updates a #${id} evaluacion`;
  }

  async remove(id: number) {
    return await this.evaluationRepository.softDelete(id);
  }
}
