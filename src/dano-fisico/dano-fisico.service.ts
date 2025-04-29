import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDanoFisicoDto } from './dto/create-dano-fisico.dto';
import { UpdateDanoFisicoDto } from './dto/update-dano-fisico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DanoFisico } from './entities/dano-fisico.entity';
import { Repository } from 'typeorm';
import { Evaluacion } from '@/evaluacion/entities/evaluacion.entity';

@Injectable()
export class DanoFisicoService {
  constructor(
    @InjectRepository(DanoFisico)
    private readonly danoFisicoRepository: Repository<DanoFisico>,
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
  ) {}
  
  async create(createDanoFisicoDto: CreateDanoFisicoDto) {
    const evaluacion = await this.evaluacionRepository.findOneBy({
      id: createDanoFisicoDto.evaluacionId
    });
    if(!evaluacion){
      throw new NotFoundException('Evaluacion no encontrada');
    }
    const danoFisico = this.danoFisicoRepository.create({
      ...createDanoFisicoDto,
      evaluacion,
    })
    return this.danoFisicoRepository.save(danoFisico);
  }

  async findAll() {
    return `This action returns all danoFisico`;
  }

  async findOne(id: number) {
    const danoFisico = await this.danoFisicoRepository.findOne({
      where: { id },
      relations: ['evaluacion']
    });

    if (!danoFisico) {
      throw new NotFoundException(`Daño físico con ID ${id} no encontrado`);
    }

    return danoFisico;
  }

  async update(id: number, updateDanoFisicoDto: UpdateDanoFisicoDto) {
    return `This action updates a #${id} danoFisico`;
  }

  async remove(id: number) {
    return await this.danoFisicoRepository.softDelete(id);
  }
}
