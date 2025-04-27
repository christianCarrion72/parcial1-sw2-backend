import { Injectable } from '@nestjs/common';
import { CreateDanoFisicoDto } from './dto/create-dano-fisico.dto';
import { UpdateDanoFisicoDto } from './dto/update-dano-fisico.dto';

@Injectable()
export class DanoFisicoService {
  create(createDanoFisicoDto: CreateDanoFisicoDto) {
    return 'This action adds a new danoFisico';
  }

  findAll() {
    return `This action returns all danoFisico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} danoFisico`;
  }

  update(id: number, updateDanoFisicoDto: UpdateDanoFisicoDto) {
    return `This action updates a #${id} danoFisico`;
  }

  remove(id: number) {
    return `This action removes a #${id} danoFisico`;
  }
}
